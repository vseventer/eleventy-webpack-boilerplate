// @see https://mozilla.github.io/nunjucks/api.html#custom-tags

// Exports.
export default class EvalExtension {
  #env;

  #nunjucksEngine;

  tags = ['eval'];

  static #instance = null;

  constructor(nunjucksEngine, env) {
    this.#env = env;
    this.#nunjucksEngine = nunjucksEngine;
  }

  parse(parser, nodes /* , lexer */) {
    // Get the tag token.
    const tok = parser.nextToken();

    // Parse the args and move after the block end.
    const args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tok.value);

    return new nodes.CallExtension(this, 'run', args);
  }

  run({ ctx }, template) {
    const result = this.#env.renderString(template, { ctx });
    return new this.#nunjucksEngine.runtime.SafeString(result);
  }

  static singleton(nunjucksEngine, env) {
    if (EvalExtension.#instance === null) {
      EvalExtension.#instance = new EvalExtension(nunjucksEngine, env);
    }
    return EvalExtension.#instance;
  }
}
