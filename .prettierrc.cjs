// prettier https://prettier.io/docs/en/options.html (최신 v3)의 기본[default]을 주로 따르며 변경 필요한 부분만 적용

module.exports = {
  // 쌍따옴표 대신 홑따옴표 사용 (주로 홀따옴표 사용)
  singleQuote: true,
  // 모든 구문 끝에 세미콜론 출력 [default]
  semi: true,
  // 공백 대신 탭으로 줄을 들여씁니다. [default]
  useTabs: false,
  // 들여쓰기 공백 수 [default]
  tabWidth: 2,
  // 가능하면 후행 쉼표 사용 [default]
  trailingComma: "all",
  // 줄 바꿈할 길이 [default]
  printWidth: 80,
  // 객체 괄호에 공백 삽입 [default]
  bracketSpacing: true,
  // 항상 화살표 함수의 매개 변수를 괄호로 감쌈 [default]
  arrowParens: "always",
  // OS에 따른 코드라인 끝 처리 방식 사용 (윈도우 맥 등 병행 작업 때문에 설정)
  endOfLine: "auto",
};
