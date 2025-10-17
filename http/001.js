// 1. URL 객체
// frontend 개발자가 URL 객체를 문자로 파싱(split)해서 사용하는 경우가 있는데 이렇게 사용하지 않습니다. URL 객체가 별도로 있습니다.
const url = new URL('https://example.com:8080/path/name?query1=string1&query2=string2&#hash');

console.log(url.href); // 전체 URL
console.log(url.protocol); // 프로토콜
console.log(url.host); // 호스트 (포트 포함)
console.log(url.hostname); // 호스트 이름
console.log(url.port); // 포트
console.log(url.pathname); // 경로
console.log(url.search); // 쿼리 문자열
console.log(url.hash); // 해시

// 쿼리 문자열이 여러개인 경우
const params = new URLSearchParams(url.search);
console.log(params.get('query1')); // 'string1'
console.log(params.get('query2')); // 'string2'

// 이러한 코드를 직접 작성하는 경우도 아래와 같이 종종 있습니다. 그런데 올바른 사용이라고 볼 수 없습니다. 구현되어 있는 것이 있기 때문입니다.
const urlString = 'https://example.com:8080/path/name?query1=string1&query2=string2&#hash';
const [protocol, , hostWithPort, ...pathParts] = urlString.split('/');
const [host, port] = hostWithPort.split(':');
const pathAndQuery = pathParts.join('/').split('?');
const pathname = pathAndQuery[0];
const [search, hash] = (pathAndQuery[1] || '').split('#');