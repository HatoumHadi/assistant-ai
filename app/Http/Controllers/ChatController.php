<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ChatController extends Controller
{
    public $longTextVar = 'The business dashboard reflects a strong and evolving performance trajectory. Customer count has risen to 3,782, marking an 11.01% increase, indicating successful engagement and outreach strategies. However, order volume has dipped slightly to 5,359, reflecting a 9.05% decrease — possibly signaling market fluctuations or areas for conversion optimization. Monthly sales highlight February and October as peak performers, while August and December saw lower figures. Despite this, the progress toward the monthly target is commendable, currently at 75.55%, a 10% improvement over the previous period. With today’s revenue hitting $3,287 — surpassing last month’s — the outlook remains optimistic and points toward effective strategic adjustments.
                            The **monthly statistics chart** reinforces this narrative, showing consistent target levels throughout the year and notable gains in actual performance from July onward. The upward momentum peaking in November reflects improved operational execution and goal alignment in the latter part of the year.
                            Customer demographic data reveals that the majority of users are from the USA, accounting for 2,379 customers or 79%, followed by France with 589 customers (23%). This geographical concentration suggests a strong U.S. market presence, with potential to further expand international engagement.
                            In the **recent orders** section, high-ticket items like the MacBook Pro 13” ($2,399) and iPhone 15 Pro Max ($1,869) were successfully delivered, reinforcing demand for premium products. Meanwhile, the Apple Watch Ultra ($879) remains in a pending state, and the iPad Pro 3rd Gen ($1,699) was canceled, hinting at fulfillment or customer satisfaction issues that may warrant follow-up. The AirPods Pro 2nd Gen ($240) order was completed successfully. Overall, the order flow indicates a healthy mix of product interest with a few operational bottlenecks to be refined for smoother processing.
                            Furthermore, a breakdown of **company-wise revenue performance** shows positive momentum for most top-performing brands. Apple Inc., Tesla Inc., and Amazon.com Inc. each recorded an 11.01% increase in their revenue, contributing $1,232, $1,232, and $2,567 respectively. These strong performances reflect solid market demand and brand loyalty. On the other hand, PayPal Inc. experienced a 9.05% decline, pulling in $965, which could signal a dip in transactional volume or customer usage, possibly requiring strategic reassessment.
                            From an **investment standpoint**, portfolio performance showed some fluctuation between July and November 2025. After an initial increase mid-July, a decline was observed through August and September, with some recovery seen in early October. The portfolio appears to be stabilizing near the $32–$33 range, hinting at resilience in the face of broader market trends. This performance can be linked to strategic stock moves highlighted in the **Trending Stocks** section: Tesla (TSLA) and Apple (AAPL) both show gains at $192.53, with increases of 1.01% and 3.59%, respectively. Spotify (SPOT) also rose by 2.11%, priced at $130.22. These upward trends align with the companies’ contributions to revenue and suggest strong investment confidence, supporting continued market optimism for the near term.
                            This comprehensive view paints a picture of a thriving business with upward momentum, customer loyalty, diversified revenue streams, solid stock performance, and clear opportunities for further growth and operational refinement.';

    public function chatFn(Request $request)
    {
        $request->validate([
            'message' => 'required|string',
        ]);

        $message = $request->input('message');

        try {

            $context = "Here is the detailed report on our business performance and data. Use the information in this report to answer the user’s query:\n\n" . $this->longTextVar;

            $fullMessage = "User input: $message\n\nContext:\n$context";


            $response = Http::withOptions([
                'verify' => false
            ])->withHeaders([
                'x-rapidapi-key' => env('RAPIDAPI_KEY'),
                'x-rapidapi-host' => 'cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com',
                'Content-Type' => 'application/json'
            ])->post('https://cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com/v1/chat/completions', [
                'messages' => [
                    [
                        'role' => 'user',
                        'content' => $fullMessage
                    ]
                ],
                'model' => 'gpt-4o',
                'max_tokens' => 150,
                'temperature' => 0.7
            ]);


            if ($response->successful()) {
                $data = $response->json();
                $content = $data['choices'][0]['message']['content'] ?? null;

                if ($content) {
                    return response()->json([
                        'success' => true,
                        'reply' => trim($content),
                    ]);
                } else {
                    return response()->json([
                        'success' => false,
                        'error' => 'Unexpected response format from API.',
                        'raw_response' => $data,
                    ], 500);
                }
            }

            return response()->json([
                'success' => false,
                'error' => 'API request failed.',
                'status' => $response->status(),
                'details' => $response->json(),
            ], $response->status());


        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }
}
