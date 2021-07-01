// describe.only('criar Categoria', () => {
//   it('should', () => {
//     const soma = 2 + 2;
//     expect(soma).toBe(4);
//   });
// });
const myBeverage = {
  delicious: true,
  sour: false,
};

test.only('is not sour', () => {
  expect(myBeverage.sour).toBeFalsy();
});
