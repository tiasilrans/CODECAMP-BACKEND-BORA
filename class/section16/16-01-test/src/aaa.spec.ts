// 1. 한 개 테스트 하기
it('더하기 테스트', () => {
  const a = 1;
  const b = 2;
  expect(a + b).toBe(3);
});

// 1. 여러 개 테스트 하기
describe('나의 테스트 그룹', () => {
  it('더하기 테스트', () => {
    const a = 1;
    const b = 2;
    expect(a + b).toBe(3);
  });

  it('곱하기 테스트', () => {
    const a = 1;
    const b = 2;
    expect(a * b).toBe(2);
  });
});

// 3. 상품 구매하기 테스트 예제
describe('상품 구매 테스트', () => {
  //   beforeAll(() => {}); // 모든 it를 실행하기 전에 딱 1번 실행 ex) 로그인
  //   beforeEach(() => {}); // 각 it를 실행하기 전에 매번 실행 ex) 초기화
  it('돈검증 테스트', () => {
    const result = true; //돈 충분하다고 가정하기
    expect(result).toBe(true);
  });

  it('상품 구매하기', () => {
    const result = true; //상품을 구매했다고 가정하기
    expect(result).toBe(true);
  });
});
