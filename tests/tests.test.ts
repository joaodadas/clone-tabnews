const calculadora = require("../models/calculadora");

test("soma", () => {
  const result = calculadora.somar(2, 2);
  expect(result).toBe(4);
});
