import React from "react";

export default function Showbox({ show }) {
  return (
    <>
      {show.length !== 0 ? (
        <>
          <p className="subtitle">{show[0].weather}</p>
          <div className="row">
            <div className="col">
              <h3>기온</h3>
              <p>{show[0].temper}º 입니다.</p>
              <h3>습도</h3>
              <p>{show[0].humidity}%입니다.</p>
            </div>
            <div className="col">
              <h3>
                1시간 <br />
                강수량
              </h3>
              <p>
                {show[0].rain == 0
                  ? "강수량이 없습니다."
                  : `{show[0].id === 0 ? "현재" : show[0].id + "시간뒤의"} 강수량은 ${show[0].rain}입니다.`}
              </p>
            </div>
            <div className="col">
              <h3>풍속</h3>
              <p>{show[0].wind}m/s 입니다</p>

              <h3>풍향</h3>
              <p>현재 {show[0].windtext} 입니다.</p>
            </div>
          </div>
        </>
      ) : (
        <p>"로딩중"</p>
      )}
    </>
  );
}
