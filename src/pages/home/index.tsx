import React, { useState, useEffect } from "react";
import { Col, Row, Button, Typography, Input, Card } from "antd";

import style from "./home.module.css";

import { APIGetStoreData } from "../../services/api/storeDataAPI";

export function Home({ ...props }) {
  const [allData, setAllData] = useState<any[]>([]);
  const [filterData, setFilterData] = useState<any[]>([]);
  const [genderList, setGenderList] = useState<any[]>([]);
  const [countryList, setCountryList] = useState<any[]>([]);
  const [textSearch, setTextSearch] = useState("");
  const [btnGenderActive, setBtnGenderActive] = useState("");
  const [btnCountryActive, setBtnCountryActive] = useState("");

  const { Title } = Typography;

  const getMockData = async () => {
    let resultGetAPI: any = await APIGetStoreData();
    setFilterData(resultGetAPI.data);
    setAllData(resultGetAPI.data);
  };

  const classifyGender = async () => {
    let newAllGender: any = allData.map((item: any) => item.gender);
    let newArrGender: any = new Set(newAllGender);
    let newGenderList: any = [...newArrGender];
    setGenderList(newGenderList);
  };

  const classifyCountry = async () => {
    let newAllCountry: any = allData.map((item: any) => item.country);
    let newArrCountry: any = new Set(newAllCountry);
    let newCountryList: any = [...newArrCountry];
    setCountryList(newCountryList);
  };

  const filterDataFn = async () => {
    let filterData: any = {
      gender: btnGenderActive,
      country: btnCountryActive,
      name: textSearch,
    };
    let outputResult = allData.filter((item) => {
      if (filterData.name === "") {
        if (filterData.gender && filterData.country === "") {
          return item.gender === filterData.gender;
        } else if (filterData.country && filterData.gender === "") {
          return item.country === filterData.country;
        } else if (filterData.gender && filterData.country) {
          return (
            item.gender === filterData.gender &&
            item.country === filterData.country
          );
        } else {
          return item;
        }
      } else {
        setBtnGenderActive('');
        setBtnCountryActive('');
        return (
          (item.first_name+' '+item.last_name)
            .toLowerCase()
            .indexOf(filterData.name.toLowerCase()) !== -1
        );
      }
    });
    setFilterData(outputResult);
  };

  const searchByGender = async (textSearch: string) => {
    setBtnGenderActive(textSearch);
  };

  const searchByCountry = async (textSearch: string) => {
    setBtnCountryActive(textSearch);
  };

  const clear = async () => {
    setTextSearch('');
    setBtnGenderActive('');
    setBtnCountryActive('');
  };

  const textSearchFn = async (text: any) => {
    setTextSearch(text);
  };

  useEffect(() => {
    getMockData();
  }, []);

  useEffect(() => {
    filterDataFn();
  }, [btnCountryActive, btnGenderActive, textSearch]);

  useEffect(() => {
    classifyGender();
    classifyCountry();
  }, [allData.length]);

  return (
    <>
      <div className={style.appContainer}>
        <Row justify="center" className={style.filterHeader}>
          <Col xs={24} className="textCenter">
            <Title className={style.topicHeader}>Test</Title>
          </Col>
          <Col xs={24}>
            <Row justify="center" className={style.genderFilter}>
              {genderList
                ? genderList.map((item) => (
                    <Button
                      key={item}
                      onClick={() => searchByGender(item)}
                      type={btnGenderActive === item ? "primary" : undefined}
                      className={style.genderFilterBtn}
                    >
                      {item}
                    </Button>
                  ))
                : null}
            </Row>
          </Col>
          <Col xs={24}>
            <Row justify="center" className={style.countryFilter}>
              {countryList
                ? countryList.map((item) => (
                    <Button
                      key={item}
                      onClick={() => searchByCountry(item)}
                      type={btnCountryActive === item ? "primary" : undefined}
                      className={style.countryFilterBtn}
                    >
                      {item}
                    </Button>
                  ))
                : null}
            </Row>
          </Col>
          <Col xs={24}>
            <Row justify="center" className={style.searchFilter}>
              <Col xs={18} sm={12} md={8} lg={6} xl={3}>
                <Input
                  placeholder="Search"
                  value={textSearch}
                  onChange={(e) => textSearchFn(e.target.value)}
                />
              </Col>
              <Col xs={4} sm={4} md={2} lg={2} xl={2}>
                <Button type="link" className={style.clearBtn} onClick={() => clear()}>
                  Clear
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row justify="center" className={style.dataCardRow}>
          <div className={style.dataCardBox}>
            <Row gutter={[16, 16]}>
              {filterData
                ? filterData.map((item, i) => (
                    <Col xs={24} sm={24} md={8} lg={8} xl={8} key={item.id}>
                      <Card
                        hoverable
                        bodyStyle={{ textAlign: "center" }}
                        cover={
                          <div
                            style={{
                              overflow: "hidden",
                              height: "300px",
                              display: "flex",
                              background: "#cccccc",
                              justifyContent: "center",
                            }}
                          >
                            <img
                              alt="example"
                              style={{ height: "100%" }}
                              src={item.image}
                            />
                          </div>
                        }
                      >
                        <p className={style.cardName}>
                          {item.first_name} {item.last_name}
                        </p>
                        <p className={style.cardData}>{item.gender}</p>
                        <p className={style.cardData}>{item.email}</p>
                        <p className={style.cardData}>{item.country}</p>
                      </Card>
                    </Col>
                  ))
                : null}
            </Row>
          </div>
        </Row>
      </div>
    </>
  );
}
