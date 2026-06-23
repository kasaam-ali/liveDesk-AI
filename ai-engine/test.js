const { describe, it } = require('node:test');
const assert = require('node:assert');

describe('LiveDesk AI Engine', () => {
  it('should load modules without error', () => {
    assert.doesNotThrow(() => {
      require('./conversation/context');
      require('./prompts/manager');
    });
  });

  it('should contain saylani context', () => {
    const context = require('./conversation/context');
    assert.ok(context.organization);
    assert.ok(context.courses);
    assert.ok(context.faqs);
  });

  it('should generate system prompt', () => {
    const promptManager = require('./prompts/manager');
    const prompt = promptManager.getSystemPrompt();
    assert.ok(prompt.includes('LiveDesk AI'));
    assert.ok(prompt.includes('Saylani'));
  });
});