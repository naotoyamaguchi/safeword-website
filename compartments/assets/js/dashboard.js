(function(window) {
  const root = document.getElementById('root');

  



  function xmlRequest(url){
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open("GET", url);
    oReq.send();
  }

  xmlRequest("https://kf9zxc5wj0.execute-api.us-east-1.amazonaws.com/safeword/videos");

  function reqListener () {
    console.log(this.responseText);
    render(JSON.parse(this.responseText));
  }

  function render(data){
    console.log(moment(data[0].LastModified).fromNow());
    const container = React.createElement(
      'ul',
      { className: 'list-container' },
      data.map((link, key) =>
        React.createElement(
          'li',
          {key, className: 'item'},
          React.createElement(
            'a',
            { key, href: `https://s3.amazonaws.com/safeword-storage/${link.Key}`, target: '_blank' },
            [
              React.createElement(
              'p',
              { key, className: 'item-detail'},
              `File Size: ${Math.round(link.Size/1000 * 100) / 100}KB`)
              ],
              [
              React.createElement(
              'p',
              { key, className: 'item-detail'},
              `${moment(link.LastModified).calendar()}`
              )
            ]
          )
        )
      )
    );

    ReactDOM.render(container, root);
  }


  
})(window);