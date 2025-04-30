<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
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

            $isReportRequest = $this->isReportRequest($message);

            $context = "This is the provided business data:\n\n" . $this->longTextVar;

            $systemMessage = "You are a helpful assistant named Mark.
            When the user greets you (e.g., 'hello', 'hi'), always start your response with: 'I am Mark, how can I help you? just if the input message contain greets words.'
            not every response mention this message 'I am Mark, how can I help you?'.
            without mention this string 'PHP-style array' in response.
            If the user requests a report, reply with a PHP-style array: ['header' => [...], 'data' => [[...], [...]]]
            Otherwise, use the business data to intelligently answer user questions. without appear string 'PHP-style array' in response.
            Always be friendly and identify yourself as Mark.";

            $messages = [
                ['role' => 'system', 'content' => $systemMessage],
                ['role' => 'user', 'content' => "User input: $message\n\nBusiness Data:\n$context"],
            ];

            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $api_key_open_ai,
                'Content-Type' => 'application/json',
            ])->post('https://api.openai.com/v1/chat/completions', [
                'model' => 'gpt-4o',
                'messages' => $messages,
                'temperature' => 1,
                'max_tokens' => 500,
                'top_p' => 1,
                'frequency_penalty' => 0,
                'presence_penalty' => 0,
            ]);

            if ($response->successful()) {
                $data = $response->json();
                $content = $data['choices'][0]['message']['content'] ?? null;

                if ($content) {
                    $textResponse = trim($content);
                    $reportData = null;

                    $pattern = '/```php(.*?)```/s';
                    if (preg_match($pattern, $textResponse, $matches)) {
                        $parsedData = $this->parseBotArrayString($matches[1]);

                        $path = 'reports/report_' . now()->format('Ymd_His') . '.xlsx';
                        $export = new ReportExport($parsedData);
                        $filePath = storage_path('app/public/' . $path);
                        Excel::store($export, $path, 'public');

                        $reportData = [
                            'report_path' => asset('storage/' . $path),
                            'report_filename' => 'report.xlsx',
                        ];

                        $textResponse = preg_replace($pattern, '', $textResponse);
                    }


                    return response()->json([
                        'success' => true,
                        'reply' => $textResponse,
                        'report' => $reportData,
                    ]);
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
                    'error' => 'Error communicating with AI service.',
                    'status_code' => $response->status(),
                ], $response->status());
            }
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    private function isReportRequest(string $message): bool
    {
        $keywords = ['generate report', 'create report', 'report', 'summary', 'export', 'sheet', 'excel'];
        $lowerMessage = strtolower($message);

        foreach ($keywords as $keyword) {
            if (Str::contains($lowerMessage, $keyword)) {
                return true;
            }
        }

        return false;
    }

    private function parseBotArrayString(string $arrayString): array
    {
        $arrayString = trim($this->extractArrayContent($arrayString));

        \Log::info('Parsing array string:', ['arrayString' => $arrayString]);

        try {
            $evaluated = eval("return $arrayString;");

            if (is_array($evaluated) && isset($evaluated['header']) && isset($evaluated['data'])) {
                return $evaluated;
            }
        } catch (\Throwable $e) {
            \Log::error('Error parsing array:', ['error' => $e->getMessage()]);
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
        return trim(preg_replace('/^```php|^```|^php|\s*```$/m', '', trim($response)));
    }


    public function handleVoice(Request $request)
    {

        $apiKey4 = config('services.openai.api_key_1');

        if (!$request->hasFile('audio')) {
            return response()->json([
                'success' => false,
                'error' => 'No audio file received.',
            ], 400);
        }

        try {
            $audioFile = $request->file('audio');


            if (!$audioFile) {
                return response()->json(['success' => false, 'error' => 'No audio file received.'], 400);
            }


            Log::info('Audio file info', [
                'valid' => $audioFile->isValid(),
                'originalName' => $audioFile->getClientOriginalName(),
                'mime' => $audioFile->getMimeType(),
                'size' => $audioFile->getSize(),
                'realPath' => $audioFile->getRealPath()
            ]);

            Storage::makeDirectory('temp');

            $fileName = uniqid() . '.webm';
            $fullPath = storage_path('app/temp/' . $fileName);
            copy($audioFile->getRealPath(), $fullPath);

            if (!file_exists($fullPath)) {
                return response()->json([
                    'success' => false,
                    'error' => 'Failed to save audio file.',
                ]);
            }


            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $apiKey4,
            ])->attach(
                'file',
                file_get_contents($fullPath),
                'voice-message.webm', // filename
                ['Content-Type' => 'audio/webm'] // specify MIME type manually
            )->post('https://api.openai.com/v1/audio/transcriptions', [
                'model' => 'whisper-1',
            ]);


            if ($response->successful()) {
                $messages = $this->getMessage($response->json()['text']);

                $chat = Http::withHeaders([
                    'Authorization' => 'Bearer ' . $apiKey4,
                ])->post('https://api.openai.com/v1/chat/completions', [
                    'model' => 'gpt-4o',
                    'messages' => $messages,
                ]);

                if ($chat->successful()) {
                    $data = $chat->json();
                    $content = $data['choices'][0]['message']['content'] ?? null;

                    if ($content) {
                        $textResponse = trim($content);
                        $reportData = null;

                        $pattern = '/```php(.*?)```/s';
                        if (preg_match($pattern, $textResponse, $matches)) {
                            $parsedData = $this->parseBotArrayString($matches[1]);

                            $path = 'reports/report_' . now()->format('Ymd_His') . '.xlsx';
                            $export = new ReportExport($parsedData);
                            $filePath = storage_path('app/public/' . $path);
                            Excel::store($export, $path, 'public');

                            $reportData = [
                                'report_path' => asset('storage/' . $path),
                                'report_filename' => 'report.xlsx',
                            ];

                            $textResponse = preg_replace($pattern, '', $textResponse);
                        }

                        Log::info('Data', ['response' => $reportData]);

                        return response()->json([
                            'success' => true,
                            'reply' => $textResponse,
                            'report' => $reportData,
                        ]);
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
                        'error' => 'Error communicating with AI service.',
                        'status_code' => $chat->status(),
                    ], $chat->status());
                }
            } else {
                return response()->json([
                    'success' => false,
                    'error' => '❌ Failed to transcribe audio.',
                ]);
            }


        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Exception occurred: ' . $e->getMessage(),
            ], 500);
        }
    }


    public function getMessage($inputMessage)
    {
        $context = "This is the provided business data:\n\n" . $this->longTextVar;

        $systemMessage = "You are a helpful assistant named Mark.
            When the user greets you (e.g., 'hello', 'hi'), always start your response with: 'I am Mark, how can I help you? just if the input message contain greets words.'
            not every response mention this message 'I am Mark, how can I help you?'.
            without mention this string 'PHP-style array' in response.
            If the user requests a report, reply with a PHP-style array: ['header' => [...], 'data' => [[...], [...]]]
            Otherwise, use the business data to intelligently answer user questions.  without appear string 'PHP-style array' in response.
            Always be friendly and identify yourself as Mark.";

        return [
            ['role' => 'system', 'content' => $systemMessage],
            ['role' => 'user', 'content' => "User input: $inputMessage\n\nBusiness Data:\n$context"],
        ];
    }

}
