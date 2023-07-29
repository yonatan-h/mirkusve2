export default function mapUrl(url) {
  //when using live server to debug

  const inContentScript = window.location.href.match(/leetcode/);

  if (inContentScript) {
    return chrome.runtime.getURL(url);
  } else {
    return '/dist' + url;
  }
}
