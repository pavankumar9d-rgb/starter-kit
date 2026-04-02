// tokenService.js
// A utility service to calculate or format token costs if needed for logging or analytics.

function calculateTokenCost(usage, model = 'gpt-4o-mini') {
  if (!usage) return { cost: 0, formatted: '$0.00' };

  // Example Pricing per 1M tokens (adjust based on current OpenAI pricing)
  const PRICING = {
    'gpt-4o-mini': { prompt: 0.150, completion: 0.600 },
    'gpt-4o': { prompt: 5.00, completion: 15.00 }
  };

  const rates = PRICING[model] || PRICING['gpt-4o-mini'];
  
  const costPrompt = (usage.prompt_tokens / 1000000) * rates.prompt;
  const costCompletion = (usage.completion_tokens / 1000000) * rates.completion;
  const totalCost = costPrompt + costCompletion;

  return {
    cost: totalCost,
    formatted: `$${totalCost.toFixed(6)}`
  };
}

module.exports = { calculateTokenCost };
