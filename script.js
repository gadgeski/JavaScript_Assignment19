const hiddenItems = document.querySelectorAll(".hidden-item");

function checkVisibility() {
  hiddenItems.forEach((item) => {
    // getBoundingClientRect() は要素のサイズとビューポートに対する位置を返す
    const itemTop = item.getBoundingClientRect().top;
    const itemBottom = item.getBoundingClientRect().bottom;
    const windowHeight = window.innerHeight; // ビューポートの高さ

    // 要素の上端がビューポートの下端より上にある AND
    // 要素の下端がビューポートの上端より下にある場合
    // つまり、要素がビューポート内に部分的にでも入っている場合
    if (itemTop < windowHeight && itemBottom > 0) {
      item.classList.add("visible");
    } else {
      // オプション: 画面外に出たら再度非表示にしたい場合
      // item.classList.remove('visible');
    }
  });
}

// スクロールイベントを監視
window.addEventListener("scroll", checkVisibility);

// ページロード時にも一度実行して、最初から表示されている要素を処理
checkVisibility();
