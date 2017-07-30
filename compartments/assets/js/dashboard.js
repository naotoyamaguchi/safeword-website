// const data = [
// {"Key":"videos/","LastModified":"2017-07-30T00:20:49.000Z","ETag":"\"d41d8cd98f00b204e9800998ecf8427e\"","Size":0,"StorageClass":"STANDARD"},
// {"Key":"videos/2017-07-30_00-43-47.mp4","LastModified":"2017-07-30T01:04:21.000Z","ETag":"\"25dee9538fed4c9a039875b913aae5b2\"","Size":339913,"StorageClass":"STANDARD"},
// {"Key":"videos/2017-07-30_01-05-57.mp4","LastModified":"2017-07-30T01:20:27.000Z","ETag":"\"c38ea2aed0e2841a5108e1a87c9714c5\"","Size":279959,"StorageClass":"STANDARD"},
// {"Key":"videos/2017-07-30_01-11-47.mp4","LastModified":"2017-07-30T01:11:59.000Z","ETag":"\"38da4a1e8142c97c39e8a1e351c90baa\"","Size":269501,"StorageClass":"STANDARD"},
// {"Key":"videos/2017-07-30_01-20-15.mp4","LastModified":"2017-07-30T01:20:27.000Z","ETag":"\"81c8612bc7a0d78544729706eb7c5617\"","Size":302481,"StorageClass":"STANDARD"},
// {"Key":"videos/2017-07-30_02-49-33.mp4","LastModified":"2017-07-30T02:49:45.000Z","ETag":"\"25b9098871d1483b4962f8a4bbffa7ef\"","Size":272180,"StorageClass":"STANDARD"},
// {"Key":"videos/2017-07-30_02-51-45.mp4","LastModified":"2017-07-30T02:51:58.000Z","ETag":"\"255b42a4df47a1e59b56951aa6cdce3b\"","Size":291039,"StorageClass":"STANDARD"},
// {"Key":"videos/2017-07-30_02-52-50.mp4","LastModified":"2017-07-30T02:53:03.000Z","ETag":"\"f85fabaad3c61ec30cf6719dddab069b\"","Size":321137,"StorageClass":"STANDARD"},
// {"Key":"videos/2017-07-30_05-07-55.mp4","LastModified":"2017-07-30T05:08:14.000Z","ETag":"\"bafaecfac97368be4031795912e55a8e\"","Size":291576,"StorageClass":"STANDARD"},
// {"Key":"videos/2017-07-30_05-30-58.mp4","LastModified":"2017-07-30T05:31:11.000Z","ETag":"\"06c8206e09032004ee1c6df9561a5e18\"","Size":313817,"StorageClass":"STANDARD"},
// {"Key":"videos/2017-07-30_05-35-26.mp4","LastModified":"2017-07-30T05:35:39.000Z","ETag":"\"d9585ff1c4d87b1390ab1bce34d8537e\"","Size":311080,"StorageClass":"STANDARD"},
// {"Key":"videos/2017-07-30_05-36-12.mp4","LastModified":"2017-07-30T05:36:25.000Z","ETag":"\"102e324d96a6caefd35a7fa9f4956421\"","Size":317439,"StorageClass":"STANDARD"},
// {"Key":"videos/2017-07-30_05-42-18.mp4","LastModified":"2017-07-30T05:42:32.000Z","ETag":"\"dfe4b0e79f0c15f62e780e729de3f722\"","Size":320178,"StorageClass":"STANDARD"},
// {"Key":"videos/index.html","LastModified":"2017-07-30T05:42:31.000Z","ETag":"\"373d05a42f27912caf2027fae11eb2cd\"","Size":176,"StorageClass":"STANDARD"},
// {"Key":"videos/testcopy.txt","LastModified":"2017-07-30T05:42:32.000Z","ETag":"\"d41d8cd98f00b204e9800998ecf8427e\"","Size":0,"StorageClass":"STANDARD"}];



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
          {key, className: 'item', href: `https://s3.amazonaws.com/safeword-storage/${link.Key}`},
          React.createElement(
            'a',
            { key, href: `https://s3.amazonaws.com/safeword-storage/${link.Key}` },
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

  // function render(data){
  //   const container = React.createElement(
  //     'ul',
  //     { className: 'list-container' },
  //     data.map((link, key) =>
  //       React.createElement(
  //         'a',
  //         { key, className: 'item', href: `https://s3.amazonaws.com/safeword-storage/${link.Key}` },
  //         `${link.LastModified}`)
  //     )
  //   );

  //   ReactDOM.render(container, root);
  // }


  
})(window);