import { useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

function App() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [places, setPlaces] = useState(
    [] as kakao.maps.services.PlacesSearchResultItem[]
  );

  const [locations, setLocations] = useState([
    { lat: 33.450701, lng: 126.570667 },
  ]);

  // 키워드로 장소검색하고 목록 출력
  const onSearch = (keyword: string) => {
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(keyword, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        setPlaces(data);
        setLocations(
          data.map((place) => ({
            lat: Number(place.y),
            lng: Number(place.x),
          }))
        );
      }
    });
  };

  // 지도 클릭 시 마커 변경 및 중심 좌표 변경
  const onClick = (
    _map: kakao.maps.Map,
    mouseEvent: kakao.maps.event.MouseEvent
  ) => {
    const latlng = mouseEvent.latLng;
    setLocations([{ lat: latlng.getLat(), lng: latlng.getLng() }]);

    _map.setCenter(latlng);
  };

  return (
    <div>
      <Map
        center={{ lat: 33.450701, lng: 126.570667 }}
        style={{ width: "100vw", height: "100vh", margin: "0", padding: "0" }}
        level={3}
        onClick={onClick}
      >
        {locations.map((loc) => (
          <MapMarker
            position={loc}
            image={{
              src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
              size: { width: 24, height: 35 },
            }}
          />
        ))}
      </Map>
    </div>
  );
}

export default App;
