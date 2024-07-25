import React, { useState } from "react";
import "./Packageselection.css";
import { Button } from "react-bootstrap";

const Packageselection = () => {
  const [radioValue, setRadioValue] = useState(1);

  return (
    <>
      <section class="price_plan_area section_padding_130_80 py-5" id="pricing">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-12 col-sm-8 col-lg-6">
              <div
                class="section-heading text-center wow fadeInUp"
                data-wow-delay="0.2s"
                style={{ visibility: "visible" }}
              >
                <h3>Packages</h3>
                <h6 className="">
                  And a subheading describing your pricing plans, too
                </h6>
                <div className="py-3">
                  {/* <ButtonGroup toggle>
                    {radios.map((radio, idx) => (
                      <ToggleButton
                        key={idx}
                        type="radio"
                        variant="secondary"
                        name="radio"
                        value={radio.value}
                        checked={radioValue === radio.value}
                        onChange={(e) => setRadioValue(e.currentTarget.value)}
                        className="custom-toggle-btn"
                      >
                        {radio.name}
                      </ToggleButton>
                    ))}
                  </ButtonGroup> */}
                  <div>
                    <Button
                      className="custom-toggle-btn"
                      variant="secondary"
                      onClick={() => setRadioValue(1)}
                    >
                      Monthly plans
                    </Button>
                    <Button
                      className="custom-toggle-btn"
                      variant="secondary"
                      onClick={() => setRadioValue(2)}
                    >
                      Annual plans
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {radioValue == 1 ? (
            <div class="row justify-content-center">
              <div class="col-12 col-sm-8 col-md-6 col-lg-4">
                <div
                  class="single_price_plan wow fadeInUp"
                  data-wow-delay="0.2s"
                  style={{ visibility: "visible" }}
                >
                  <div class="title">
                    <h3>Start Up</h3>
                    <p>Start a trial</p>
                    {/* <div class="line"></div> */}
                  </div>
                  <div class="price">
                    <h4>₹0 </h4> &nbsp; <span>per month</span>
                  </div>
                  <div class="description">
                    <p>
                      <i class="lni lni-checkmark-circle"></i>Duration: 7days
                    </p>
                    <p>
                      <i class="lni lni-checkmark-circle"></i>10 Features
                    </p>
                    <p>
                      <i class="lni lni-close"></i>No Hidden Fees
                    </p>
                    <p>
                      <i class="lni lni-close"></i>100+ Video Tuts
                    </p>
                    <p>
                      <i class="lni lni-close"></i>No Tools
                    </p>
                  </div>
                  <div class="">
                    <a
                      class="btn btn-2"
                      href="#"
                      style={{ background: "#5B549E", color: "white" }}
                    >
                      Select
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-12 col-sm-8 col-md-6 col-lg-4">
                <div
                  class="single_price_plan active wow fadeInUp"
                  data-wow-delay="0.2s"
                  style={{ visibility: "visible" }}
                >
                  <div class="side-shape">
                    <img
                      src="https://bootdey.com/img/popular-pricing.png"
                      alt=""
                    />
                  </div>
                  <div class="title">
                    {/* <span>Popular</span> */}
                    <h3>Small Business</h3>
                    <p>For Small Business Team</p>
                    {/* <div class="line"></div> */}
                  </div>
                  <div class="price">
                    <h4>₹9.99 </h4> &nbsp; <span>per month</span>
                  </div>
                  <div class="description">
                    <p>
                      <i class="lni lni-checkmark-circle"></i>Duration: 3 Month
                    </p>
                    <p>
                      <i class="lni lni-checkmark-circle"></i>50 Features
                    </p>
                    <p>
                      <i class="lni lni-checkmark-circle"></i>No Hidden Fees
                    </p>
                    <p>
                      <i class="lni lni-checkmark-circle"></i>150+ Video Tuts
                    </p>
                    <p>
                      <i class="lni lni-close"></i>5 Tools
                    </p>
                  </div>
                  <div class="">
                    <a
                      class="btn btn-2"
                      href="#"
                      style={{ background: "#5B549E", color: "white" }}
                    >
                      Select
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-12 col-sm-8 col-md-6 col-lg-4">
                <div
                  class="single_price_plan wow fadeInUp"
                  data-wow-delay="0.2s"
                  style={{ visibility: "visible" }}
                >
                  <div class="title">
                    <h3>Enterprise</h3>
                    <p>Unlimited Possibilities</p>
                    {/* <div class="line"></div> */}
                  </div>
                  <div class="price">
                    <h4>₹49.99 </h4>
                    &nbsp; <span>per month</span>
                  </div>
                  <div class="description">
                    <p>
                      <i class="lni lni-checkmark-circle"></i>Duration: 1 year
                    </p>
                    <p>
                      <i class="lni lni-checkmark-circle"></i>Unlimited Features
                    </p>
                    <p>
                      <i class="lni lni-checkmark-circle"></i>No Hidden Fees
                    </p>
                    <p>
                      <i class="lni lni-checkmark-circle"></i>Unlimited Video
                      Tuts
                    </p>
                    <p>
                      <i class="lni lni-checkmark-circle"></i>Unlimited Tools
                    </p>
                  </div>
                  <div class="">
                    <a
                      class="btn btn-2"
                      href="#"
                      style={{ background: "#5B549E", color: "white" }}
                    >
                      Select
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div class="row justify-content-center">
              <div class="col-12 col-sm-8 col-md-6 col-lg-4">
                <div
                  class="single_price_plan wow fadeInUp"
                  data-wow-delay="0.2s"
                  style={{ visibility: "visible" }}
                >
                  <div class="title">
                    <h3>Start Up</h3>
                    <p>Start a trial</p>
                    {/* <div class="line"></div> */}
                  </div>
                  <div class="price">
                    <h4>₹0 </h4> &nbsp; <span>per month</span>
                  </div>
                  <div class="description">
                    <p>
                      <i class="lni lni-checkmark-circle"></i>Duration: 7days
                    </p>
                    <p>
                      <i class="lni lni-checkmark-circle"></i>10 Features
                    </p>
                    <p>
                      <i class="lni lni-close"></i>No Hidden Fees
                    </p>
                    <p>
                      <i class="lni lni-close"></i>100+ Video Tuts
                    </p>
                    <p>
                      <i class="lni lni-close"></i>No Tools
                    </p>
                  </div>
                  <div class="">
                    <a
                      class="btn btn-2"
                      href="#"
                      style={{ background: "#5B549E", color: "white" }}
                    >
                      Select
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-12 col-sm-8 col-md-6 col-lg-4">
                <div
                  class="single_price_plan active wow fadeInUp"
                  data-wow-delay="0.2s"
                  style={{ visibility: "visible" }}
                >
                  <div class="side-shape">
                    <img
                      src="https://bootdey.com/img/popular-pricing.png"
                      alt=""
                    />
                  </div>
                  <div class="title">
                    {/* <span>Popular</span> */}
                    <h3>Small Business</h3>
                    <p>For Small Business Team</p>
                    {/* <div class="line"></div> */}
                  </div>
                  <div class="price">
                    <h4>₹599.88 </h4> &nbsp; <span>per year</span>
                  </div>
                  <div class="description">
                    <p>
                      <i class="lni lni-checkmark-circle"></i>Duration: 3 Month
                    </p>
                    <p>
                      <i class="lni lni-checkmark-circle"></i>50 Features
                    </p>
                    <p>
                      <i class="lni lni-checkmark-circle"></i>No Hidden Fees
                    </p>
                    <p>
                      <i class="lni lni-checkmark-circle"></i>150+ Video Tuts
                    </p>
                    <p>
                      <i class="lni lni-close"></i>5 Tools
                    </p>
                  </div>
                  <div class="">
                    <a
                      class="btn btn-2"
                      href="#"
                      style={{ background: "#5B549E", color: "white" }}
                    >
                      Select
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-12 col-sm-8 col-md-6 col-lg-4">
                <div
                  class="single_price_plan wow fadeInUp"
                  data-wow-delay="0.2s"
                  style={{ visibility: "visible" }}
                >
                  <div class="title">
                    <h3>Enterprise</h3>
                    <p>Unlimited Possibilities</p>
                    {/* <div class="line"></div> */}
                  </div>
                  <div class="price">
                    <h4>₹719.88 </h4>
                    &nbsp; <span>per y</span>
                  </div>
                  <div class="description">
                    <p>
                      <i class="lni lni-checkmark-circle"></i>Duration: 1 year
                    </p>
                    <p>
                      <i class="lni lni-checkmark-circle"></i>Unlimited Features
                    </p>
                    <p>
                      <i class="lni lni-checkmark-circle"></i>No Hidden Fees
                    </p>
                    <p>
                      <i class="lni lni-checkmark-circle"></i>Unlimited Video
                      Tuts
                    </p>
                    <p>
                      <i class="lni lni-checkmark-circle"></i>Unlimited Tools
                    </p>
                  </div>
                  <div class="">
                    <a
                      class="btn btn-2"
                      href="#"
                      style={{ background: "#5B549E", color: "white" }}
                    >
                      Select
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Packageselection;
