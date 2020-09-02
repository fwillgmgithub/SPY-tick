# StockBot
 **StockBot for discord**

 Responds to certain commands in the discord chat:

Get a quick price:

    t$ price IBM

    International Business Machines Corporation (IBM)
    Current Price: $127.64 +4.24(+3.44%)

Search by Company Name:

    t$ p disney

    The Walt Disney Company (DIS)
    Current Price: $134.72 +1.17 (+0.88%)

    t$ p american express

    American Express Company (AXP)
    Current Price: $104.23 +1.76 (+1.72%)

Option for a more detailed breakdown:

    t$ company JNJ

    NYSE: Johnson & Johnson (JNJ)
    $153.03 +1.51 (+1.00%)
    Open: 150.79
    Previous Close: 151.52
    Low: 149.24
    High: 153.90
    Market Cap: 404.5 B
    Shs Outstanding: 2.632 T

Get real time indices: **CURRENTLY BROKEN**

    t$ indices

    S&P 500: 3035.64 +81.42 (+2.76%)
    NASDAQ: 8914.71 +306.98(+3.57%)
    Dow: 26172.40 +763.04 (+3.00%)
    10 Year T-Note: 1.08% -0.04 (-3.90%)


Uses the finnhub.io API for realtime stock prices and uses the AlphaVantage API for company searches.
Discord.js and node.js.

More commands coming soon!

 **Note**: The original repo, uploaded March 2020 was deleted. This repo is an identical continuation of that.
