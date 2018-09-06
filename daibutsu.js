function escapeHtml(str) {
    str = str.replace(/&/g, '&amp;');
    str = str.replace(/</g, '&lt;');
    str = str.replace(/>/g, '&gt;');
    str = str.replace(/"/g, '&quot;');
    str = str.replace(/'/g, '&#39;');
    return str;
}

var app = new Vue({
    el: '#app',
    data: {
        size: null,
        background: '',
        username: '',
        flag: false,
        message: '',
        urlBase: 'https://twitter.com/intent/tweet?text=',
        myUrl: 'https://shinoharata.github.io/daibutsu/',
        urlText: '',
        urlSuccess: 'さんは大仏を作りました！　',
        urlFailed: 'さんの大仏作りは失敗しました・・・　'
    },
    computed: {
        url: function() {
            var gen_url = this.urlBase + this.username + this.urlText + this.myUrl;
            if (this.username != '') {
                gen_url = gen_url + '?name=' + this.username;
            }
            if (this.size != null) {
                gen_url = gen_url + '$size=' + this.size;
            }
            return gen_url;
        }
    },
    methods: {
        buildBuddha: function() {
            if (this.username == '') {
                alert('名前を入力してください');
                return;
            }
            this.size = Math.floor(Math.random() * 21) * 5;
            if (this.size == 0) {
                this.urlText = this.urlFailed;
                this.message = '残念、建造に失敗...';
            } else if (this.size == 100) {
                this.urlText = this.urlSuccess;
                this.message = 'すばらしい！';
            } else {
                this.urlText = this.urlSuccess;
                this.message = '';
            }
        },
        clearPage: function() {
            this.username = '';
            this.message = '';
            this.size = null;
            this.flag = false;
        }
    },
    created: function() {
        var arg = new Object;
        var pair = location.search.substring(1).split('$');
        for (var i = 0; pair[i]; i++) {
            var kv = pair[i].split('=');
            arg[kv[0]] = kv[1];
        }
        if (arg['name'] != undefined) {
            this.username = escapeHtml(arg['name']);
            this.flag = true;
        }
        if (arg['size'] != undefined) {
            this.size = escapeHtml(arg['size']);
        }
    }
})