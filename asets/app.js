(() => {
    // 厳格モード  エラーなどを見つけやすくする　とりあえず書く
    'use strict';

    // 問題文リスト　[]配列
    const questions = [
        'JavaScript',
        'document',
        'window',
        'getElementById',
        'getElementsByClassName',
        'addEventListener'
    ];

    // const X = document.getElementById('X'); DOM要素からidで取得してくる
    const entered = document.getElementById('entered');
    const remained = document.getElementById('remained');
    const inputText = document.getElementById('inputText');
    const game = document.getElementById('game');
    const mesege = document.getElementById('mesege');
    const replayBtn = document.getElementById('replayBtn');

    // remained = document.getElementById('remained') = <span id="remained">Javascript</span>
    // remainedの中のtextContentのみ抽出したものをremainedTextordsとして定義
    // textContent HTML要素の中身のテキストのみを取得する
    // split('X')　文字をXという文字ごとで分割して配列に入れるメソッド
    let remainedTextWords = remained.textContent.split('');
    let enteredTextWords = [];

    let currentKey;
    let currentText;
    // 新しい問題文をランダムにセットする関数
    const setQuestion = () => {
        // 配列questionsの中からランダムで１つ問題文を選ぶ
        // Math.random()　ランダムな数値を生成してくれるメソッド　「*」 questions.length　以下の数値から選ぶ
        // Math.floor　整数のみにする
        currentKey = Math.floor(Math.random() * questions.length);
        currentText = questions[currentKey];

        // 一度選ばれた問題は配列から削除
        // splice 配列questionsの中のcurrentKey番目の要素の位置から１個の要素を削除する
        questions.splice(currentKey, 1);
        console.log(questions);

        // 現在の問題文をリセットして新しい問題文を表示させる
        entered.textContent = '';
        remained.textContent = currentText;

        // これまでに入力されたフォームの値をリセット
        // HTMLのinputタグの中身はtextContentでなくvalue
        inputText.value = '';

        // 「入力済みの文字」と「未入力の文字」の中身の配列をリセット
        enteredTextWords = [];
        remainedTextWords = currentText.split('');
    };
    setQuestion();


    // document.addEventListener('X', (e) => {ここに処理を書く})
    // Xが起こったとき{処理}を行う
    // e 発生したイベントオブジェクトを出力する
    // e.data 発生したイベントオブジェクトのうち入力された文字のみを出力する
    document.addEventListener('input', (e) => {
        if (remainedTextWords[0] === e.data) {
            // console.log('正解！');

            // 入力済みの文字列の最後に1文字追加
            // push 配列の一番最後にデータを挿入するメソッド
            enteredTextWords.push(remainedTextWords[0]);
            // 未入力の文字の配列の先頭から1文字削除
            // shift 配列の先頭のデータを削除するメソッド
            remainedTextWords.shift();

            // console.log('============================');
            // console.log('入力済み:' + enteredTextWords);
            // console.log('未入力:' + remainedTextWords);
            // console.log('============================');

            // 入力済みの文字列と未入力の文字の配列を連結して画面に表示
            // join １つのテキストとしてくっつけるメソッド
            entered.textContent = enteredTextWords.join('');
            remained.textContent = remainedTextWords.join('');

            // すべての文字が正しく入力されたら次の問題をセット
            if (remainedTextWords.length <= 0) {
                if (questions.length <= 0) {
                    // classList 要素のクラス名を操作する機能がまとまったもの
                    // add 要素にクラス名を追加　hiddenにはCSSでdisplay: none;が設定されてる
                    game.classList.add('hidden');//ゲーム画面を非表示
                    // remove　要素からクラス名を削除
                    message.classList.remove('hidden');//終了メッセージを表示
                } else {
                    setQuestion();
                }
            }
            // } else {
            //     console.log('不正解');
        }
    });

    // もう一度プレイするボタン
    replayBtn.addEventListener('click', () => {
        // location URLのこと
        window.location.reload();
    });

})();