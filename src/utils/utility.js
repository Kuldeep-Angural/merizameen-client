export const GoogleMap = () => {
  return (
    <div className="mapouter">
      <div className="gmap_canvas">
        <iframe className="gmap_iframe" title="Google Map" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" src="https://maps.google.com/maps?width=658&amp;height=400&amp;hl=en&amp;q=pathankot punjab india&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
        <a href="https://strandsgame.net/">Strands Game</a>
      </div>
      <style>{`
        .mapouter {
          position: relative;
          text-align: right;
          width: 658px;
          height: 415px;
        }
        .gmap_canvas {
          overflow: hidden;
          background: none!important;
          width: 658p;
          height: 415px;
        }
        .gmap_iframe {
          width: 658px!important;
          height: 415px!important;
        }
      `}</style>
    </div>
  );
};

export const addDelay = (delay) => {
  return new Promise((res) => setTimeout(res, delay ? delay : 0));
};
