export const GoogleMap = ({data}) => {
    const {   city, country, state, zip } = data || {};
    const fullAddress = `${city || ''} ${state || ''} ${zip || ''} ${country || ''}`.trim();
    const mapSrc = `https://maps.google.com/maps?width=300&height=200&hl=en&q=${encodeURIComponent(fullAddress)}&t=&z=14&ie=UTF8&iwloc=B&output=embed&maptypecontrol=1&disableDefaultUI=false`;

    return (
      <div className="mapouter">
        <div className="gmap_canvas">
          <iframe className="gmap_iframe" title="Google Map" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" src={mapSrc}></iframe>
        </div>
        <style>{`
          .mapouter { position: relative; text-align: right; width: 100%; height: 300px;}
          .gmap_canvas { overflow: hidden; background: none!important; width: 100%; height: 300px; }
          .gmap_iframe { width: 100% !important; height: 300px !important; }
          .gmnoprint .gm-style-mtc { right: 10px !important; left: auto !important;}
        `}</style>
      </div>
    );
  };