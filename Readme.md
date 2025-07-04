目的：今後 TypeScript や React にスケールする為の準備段階

使用技術： JavaScript/CSS/HTML

<h1>コードの全体像</h1>

このプロジェクトは 3 つのファイルで構成されています。

- index.html: ウェブページのコンテンツ（文章、画像など）とページの基本的な構造を定義しています。

- style.css: ウェブページの見た目（色、配置、文字の大きさ、アニメーションの初期状態など）を定義しています。

- script.js: スクロールを検知し、適切なタイミングでコンテンツを表示する JavaScript のロジックが書かれています。
  これらのファイルが連携することで、ユーザーがページをスクロールしたときに、滑らかなアニメーションでコンテンツが表示される体験を提供します。

<h1>index.html の解説</h1>

この HTML ファイルは、ウェブページの骨組みと内容を定義しています。

<h3>headセクション</h3>

<h3>!DOCTYPE html</h3> HTML5で書かれたドキュメントであることを宣言しています。

<h3>html lang="ja"</h3> このページの言語が日本語であることを示します。

<h3>meta charset="UTF-8"</h3> 文字コードをUTF-8に設定し、文字化けを防ぎます。

<h3>meta name="viewport" content="width=device-width, initial-scale=1.0"</h3> レスポンシブデザイン（様々なデバイスの画面サイズに対応した表示）のために重要です。

<h3>title</h3> ブラウザのタブに表示されるページのタイトルです。

<h3>link rel="stylesheet" href="style.css"</h3> 外部のCSSファイル（style.css）を読み込み、ページのスタイルを適用します。

<h3>body>セクション</h3> 実際にユーザーに見えるコンテンツが含まれます。

<h3>div class="box"</h3> ページ上部にあるアニメーションする四角い要素です。マウスホバーで変化します。

<h3>div class="intro-section"</h3> ページの導入部分です。

<h3>div class="scroll-section"</h3> スクロールによって中身が表示される主要なセクションです。これらが複数配置されています。

<h3>class="hidden-item"</h3> スクロールで表示される各要素（画像やテキスト）には、**hidden-item**というクラスが付けられています。このクラスを持つ要素が、JavaScript によって表示・非表示の制御の対象となります。

<h3>div class="spacer"</h3> ページの下部にわざと高さを追加して、スクロールが発生するようにするための空白の要素です。

<h3>script src="script.js"</h3> 外部のJavaScriptファイル（script.js）を読み込み、スクロール時の動作を制御します。通常、JavaScriptはページの読み込みが完了した後に実行されるように、</body>タグの直前に配置されます。

<h1>CSS (style.css) の解説</h1>

この CSS ファイルは、HTML で定義された要素の見た目を整え、スクロールアニメーションの初期状態とアニメーション効果を定義しています。

- body: ページ全体の基本的なフォント、余白、背景色、文字色、行の高さを設定しています。

- .intro-section, .scroll-section: ページの各セクションのレイアウト（中央揃え、パディング、背景色など）を設定しています。

  - .scroll-section:nth-child(even): 偶数番目の.scroll-section に異なる背景色を適用し、見た目に変化をつけています。

- .hidden-item:

  - opacity: 0;: 初期状態では要素を完全に透明にしています。これが「隠れている」状態です。

  - transform: translateY(30px);: 要素を Y 軸方向（垂直方向）に 30 ピクセル下に移動させています。これにより、フェードイン時に少し上へスライドするような動きになります。

  - transition: opacity 0.6s ease-out, transform 0.6s ease-out;: ここがアニメーションの肝です。opacity と transform プロパティが変化する際に、0.6 秒かけて滑らかに変化するように設定しています。ease-out は、アニメーションの開始が速く、終了がゆっくりになる効果です。

- .hidden-item.visible:

  - このスタイルは、JavaScript によって.hidden-item クラスに加えて**visible**クラスが追加されたときに適用されます。

  - opacity: 1;: 要素を完全に不透明にします。

  - transform: translateY(0);: 要素を元の位置に戻します。

  - これにより、透明で下にずれていた要素が、スクロールによって visible クラスが追加されると、0.6 秒かけて徐々に現れながら元の位置にスライドアップするアニメーションが実現されます。

- .box のスタイル: ページ上部の四角い要素の見た目と、マウスホバー時の枠線アニメーション、背景のぼかし効果を設定しています。::before と::after は擬似要素と呼ばれるもので、要素の前後に追加のコンテンツやスタイルを適用するために使われます。

<h1>script.js の解説</h1>

この JavaScript ファイルは、スクロールイベントを監視し、どの要素をいつ表示するかを決定するロジックを実装しています。

- const hiddenItems = document.querySelectorAll(".hidden-item");:

  - まず、HTML の中から hidden-item クラスを持つすべての要素を検索し、それらを hiddenItems という定数（配列のようなもの）に格納します。これで、操作したい要素のリストが手に入ります。

- function checkVisibility() { ... }:

  - この関数は、各 hiddenItems が画面（ビューポート）に表示されているかどうかをチェックするためのものです。

  - item.getBoundingClientRect().top;: 各要素の上端が、ビューポート（現在見えている画面領域）の上端からどれくらいの距離にあるかをピクセル単位で取得します。

    - ビューポート内にあれば正の値、ビューポートより上にあれば負の値、ビューポートより下にあれば正の値（画面外）になります。

  - item.getBoundingClientRect().bottom;: 各要素の下端が、ビューポートの上端からどれくらいの距離にあるかをピクセル単位で取得します。

  - window.innerHeight;: 現在のビューポートの高さ（画面の高さ）をピクセル単位で取得します。

  - if (itemTop < windowHeight && itemBottom > 0): これが、要素が画面内に入っているかを判断する条件式です。

    - itemTop < windowHeight: 要素の上端が、ビューポートの下端よりも上にある（つまり、要素がまだビューポートの下から現れていないか、すでにビューポート内にある）

    - itemBottom > 0: 要素の下端が、ビューポートの上端よりも下にある（つまり、要素がまだビューポートの上へ消えていないか、すでにビューポート内にある）

    - この 2 つの条件が両方とも真の場合、その要素は現在ビューポート内に部分的にでも表示されていると判断されます。

  - item.classList.add("visible");: もし要素が画面内に入っていたら、その要素に**visible**というクラスを追加します。このクラスが追加されることで、CSS で定義されたフェードインアニメーションが適用され、要素が表示されます。

  - (item.classList.remove('visible');): コメントアウトされていますが、もし要素が画面外に出たら再度非表示にしたい場合に、この行のコメントを外して利用できます。

- window.addEventListener("scroll", checkVisibility);:

  - これは、ウェブページがスクロールされるたびに checkVisibility 関数を実行するように設定しています。これにより、ユーザーがスクロールするたびに、どの要素を表示すべきかチェックが行われます。

- checkVisibility();:
  - ページが初めて読み込まれたときにも、checkVisibility 関数を一度実行します。これにより、ページの一番上にあって、最初から画面に表示されているべき要素が正しく表示されるようになります。

<h1>【まとめ】</h1>
このコードは、ユーザーがウェブページをスクロールするたびに JavaScript で要素の表示位置を計算し、CSS のクラスを追加・削除することで、要素が滑らかにフェードインする視覚効果を実現しています。

これにより、単調なページに動きが加わり、ユーザー体験が向上します。
