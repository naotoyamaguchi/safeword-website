(function(window) {
  const root = document.getElementById('root');

  



  function xmlRequest(url){
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open("GET", url);
    oReq.send();
  }

  xmlRequest("https://nn8yca23nk.execute-api.us-east-1.amazonaws.com/dev/cam");

  function reqListener () {
    console.log(this.responseText);
    render(JSON.parse(this.responseText));
  }

  function classByType(key){
    if(key.endsWith(".jpg")){
      return "picture";
    }
    return false;
  }

  function render(data){
    console.log(moment(data[0].LastModified).fromNow());
    const container = React.createElement(
      'ul',
      { className: 'list-container' },
      data.filter(d => classByType(d.Key)).map((link, key) =>
        React.createElement(
          'li',
          {key, className: `item ${classByType(link.Key)}`},
          React.createElement(
            'a',
            { key, href: `https://s3.amazonaws.com/safeword-storage/${link.Key}`, target: '_blank' },
            [
              React.createElement(
              'p',
              { key, className: 'item-detail filesize'},
              `File Size: ${Math.round(link.Size/1000 * 100) / 100}KB`)
              ],
              [
              React.createElement(
              'p',
              { key, className: 'item-detail filetype'},
              `${classByType(link.Key)}`)
              ],
              [
              React.createElement(
              'p',
              { key, className: 'item-detail filedate'},
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