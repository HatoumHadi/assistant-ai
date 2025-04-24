<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\ReportExport;
use Illuminate\Support\Str;


class ChatController extends Controller
{


    public $longTextVar = 'The business dashboard reflects a strong and evolving performance trajectory. Customer count has risen to 3,782, marking an 11.01% increase, indicating successful engagement and outreach strategies. However, order volume has dipped slightly to 5,359, reflecting a 9.05% decrease — possibly signaling market fluctuations or areas for conversion optimization. Monthly sales highlight February and October as peak performers, while August and December saw lower figures. Despite this, the progress toward the monthly target is commendable, currently at 75.55%, a 10% improvement over the previous period. With today’s revenue hitting $3,287 — surpassing last month’s — the outlook remains optimistic and points toward effective strategic adjustments.
                            The **monthly statistics chart** reinforces this narrative, showing consistent target levels throughout the year and notable gains in actual performance from July onward. The upward momentum peaking in November reflects improved operational execution and goal alignment in the latter part of the year.
                            The **Sales trends** chart visualizes these patterns effectively. Sales started the year at 180 units in January, with a gradual rise to 190 in February. However, performance declined over the next few months, bottoming out at 160 in April. A slow recovery followed, and by August, sales jumped significantly to over 205. The growth continued, peaking at around 240 in November before a slight dip in December. These trends highlight a strong second half of the year, particularly from August to November, which shows successful strategic shifts and potentially improved market conditions during that period.
                            The **best-selling items** analysis reveals Printer AI as the top performer with approximately 250 units sold, followed by Scanner B2 (200 units), Copter C3 (150 units), Label Printer DA (100 units), and Fox E5 (50 units). This product performance breakdown, ranked by total sales volume, helps identify market preferences and inventory planning needs.
                            Customer demographic data reveals that the majority of users are from the USA, accounting for 2,379 customers or 79%, followed by France with 589 customers (23%). This geographical concentration suggests a strong U.S. market presence, with potential to further expand international engagement.
                            In the **recent orders** section, high-ticket items like the MacBook Pro 13” ($2,399) and iPhone 15 Pro Max ($1,869) were successfully delivered, reinforcing demand for premium products. Meanwhile, the Apple Watch Ultra ($879) remains in a pending state, and the iPad Pro 3rd Gen ($1,699) was canceled, hinting at fulfillment or customer satisfaction issues that may warrant follow-up. The AirPods Pro 2nd Gen ($240) order was completed successfully. Overall, the order flow indicates a healthy mix of product interest with a few operational bottlenecks to be refined for smoother processing.
                            The **Inventory status** panel provides critical insights into product availability and potential supply chain attention areas. Printer A1 and Label Printer D4 are well-stocked, with 25 and 12 units available, respectively. However, the complete stock-out of Scanner B2 and the low inventory level of Copier C3 (7 units) suggest urgent restocking needs. These gaps may impact order fulfillment capabilities and customer satisfaction if not addressed promptly.
                            The **Cashflow overview** chart indicates a positive and accelerating financial trend throughout the year. Starting at around $11,000 in January, cashflow increased sharply to over $15,000 in February before a minor dip in March and April. Significant growth resumed in May and peaked around $20,000 by June. Although a slight decline followed through July and August, the upward momentum picked up strongly again from September onward. By December, the cashflow reached nearly $26,000 — marking the highest point of the year and showcasing robust financial health, effective expense control, and strong revenue inflows. The chart also highlights warning and alert thresholds that help monitor financial stability, with cashflow maintaining healthy levels above these benchmarks throughout most months.
                            Furthermore, a breakdown of **company-wise revenue performance** shows positive momentum for most top-performing brands. Apple Inc., Tesla Inc., and Amazon.com Inc. each recorded an 11.01% increase in their revenue, contributing $1,232, $1,232, and $2,567 respectively. These strong performances reflect solid market demand and brand loyalty. On the other hand, PayPal Inc. experienced a 9.05% decline, pulling in $965, which could signal a dip in transactional volume or customer usage, possibly requiring strategic reassessment.
                            From an **investment standpoint**, portfolio performance showed some fluctuation between July and November 2025. After an initial increase mid-July, a decline was observed through August and September, with some recovery seen in early October. The portfolio appears to be stabilizing near the $32–$33 range, hinting at resilience in the face of broader market trends. This performance can be linked to strategic stock moves highlighted in the **Trending Stocks** section: Tesla (TSLA) and Apple (AAPL) both show gains at $192.53, with increases of 1.01% and 3.59%, respectively. Spotify (SPOT) also rose by 2.11%, priced at $130.22. These upward trends align with the companies’ contributions to revenue and suggest strong investment confidence, supporting continued market optimism for the near term.
                            This comprehensive view paints a picture of a thriving business with upward momentum, customer loyalty, diversified revenue streams, solid stock performance, and clear opportunities for further growth and operational refinement. Key insights from visual data include the strong performance of Printer AI as the best-selling product and the positive cashflow trend that consistently remained above warning thresholds, peaking at $26,000 in December.';

    public function chatFn(Request $request)
    {
        $request->validate([
            'message' => 'required|string',
        ]);

        $message = $request->input('message');

        try {

            $api_key_open_ai = config('services.openai.api_key_1');

            $context = "This is the provided data to used for generate answer :\n\n" . $this->longTextVar;

            $systemMessage = "You are a helpful assistant.
                                If the user's first message is a greeting such as 'hello', 'hi', or similar, respond with: 'I am Mark, how can I help you?'
                                Answer the user's input clearly and concisely. If the user requests a report,
                                generate the report as a data array format.
                                If the user asks for a report or table,
                                respond with a PHP-style array string structured as:
                                ['header' => [...], 'data' => [[...], [...]]] —
                                where header contains column names and data contains the rows.
                                Only include the necessary data, without any extra content.
                                Do not ask the user if they want a report;
                                if a report is not requested, respond appropriately based on the input.";


            $messages = [
                [
                    'role' => 'system',
                    'content' => $systemMessage,
                ],
                [
                    'role' => 'user',
                    'content' => "User input: $message\n\nBusiness Data:\n$context",
                ],
            ];

            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $api_key_open_ai,
                'Content-Type' => 'application/json',
            ])->post('https://api.openai.com/v1/chat/completions', [
                'model' => 'gpt-4o',
                'messages' => $messages,
                'temperature' => 1,
                'max_tokens' => 200,
                'top_p' => 1,
                'frequency_penalty' => 0,
                'presence_penalty' => 0,
            ]);

            if ($response->successful()) {
                $data = $response->json();
                $content = $data['choices'][0]['message']['content'] ?? null;
                if ($content) {
                    if ($this->isReport($content)) {
                        $parsedData = $this->parseBotArrayString($content);

                        $path = 'reports/report_' . now()->format('Ymd_His') . '.xlsx';

                        // Generate Excel file
                        $export = new ReportExport($parsedData);
                        $filePath = storage_path('app/public/' . $path);
                        Excel::store($export, $path, 'public');

                        // In your chatFn method, where you return the file:
                        return response()->download($filePath, 'report.xlsx', [
                            'Content-Type' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                        ]);
                    } else {
                        return response()->json([
                            'success' => true,
                            'reply' => trim($content),
                        ]);
                    }
                } else {
                    return response()->json([
                        'success' => false,
                        'error' => 'Unexpected response format from API.',
                        'raw_response' => $data,
                    ], 500);
                }
            } else {
                return response()->json([
                    'success' => false,
                    'error' => 'Sorry, something went wrong while communicating with the AI service. Please try again later.',
                    'status_code' => $response->status(),
                ], $response->status());
            }

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }


    private function isReport($content)
    {
        $content = trim($content);
        $content = preg_replace('/^```php|```$/m', '', $content);

        try {
            $array = eval('return ' . $content . ';');

            return is_array($array) && isset($array['header'], $array['data']) && is_array($array['header']) && is_array($array['data']);
        } catch (\Throwable $e) {
            return false;
        }
    }


    private function parseBotArrayString(string $arrayString): array
    {
        $arrayString = trim($this->extractArrayContent($arrayString));

        try {
            $evaluated = eval("return $arrayString;");

            if (is_array($evaluated) && isset($evaluated['header']) && isset($evaluated['data'])) {
                return $evaluated;
            }
        } catch (\Throwable $e) {
            return [
                'header' => [],
                'data' => [],
            ];
        }

        return [
            'header' => [],
            'data' => [],
        ];
    }

    private function extractArrayContent($response)
    {
        $cleaned = preg_replace('/^```php|^```|^php|\s*```$/m', '', trim($response));
        return trim($cleaned);
    }
}
