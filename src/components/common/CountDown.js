"use client"
import React from 'react'
import useCountDown from '@/hooks/useCountDown';
import WordOpacity from '@/components/common/WordOpacity';
import SectionName from '@/components/common/sectionTitle/SectionName';
import SectionTitleTwo from '@/components/common/sectionTitle/SectionTitleTwo';

const CountDown = ({ styleNum }) => {
    const currentTime = useCountDown()


    // styleNum 0 from home page 1
    // styleNum 1 from home page 2
    // styleNum 2 from home page 3
    // styleNum 3 from home page 4
    // styleNum 4 from home page 5
    // styleNum 5 from home page 6
    // styleNum 6 from home page 7


    // ----- Change classname define in home page
    let prantClass;
    let timeClass;
    let countdownGradient;
    let isBg;
    let labelClass;

    switch (styleNum) {
        case 0:
            prantClass = "pb-40 pb-lg-60 pb-xl-80 pt-4 pt-lg-30 pt-xxl-40";
            timeClass = "primary-text-shadow";
            countdownGradient = "countdown-gradient"
            break;
        case 1:
            prantClass = "pb-30 pb-lg-60 pb-xl-90 pt-150 pt-xxl-180";
            timeClass = "primary-text-shadow";
            countdownGradient = "countdown-gradient"
            break;
        case 2:
            labelClass = "custom-roboto";
            prantClass = "py-2 py-lg-20 py-xl-40";
            timeClass = "text-primary custom-jakarta"
            break;
        case 3:
            labelClass = "custom-jakarta";
            prantClass = "pt-50 pt-lg-100 pt-xxl-130";
            timeClass = "text-primary custom-jakarta";
            isBg = "dark-wrapper-bg"
            break;
        case 4:
            labelClass = "";
            prantClass = "pt-20 pt-lg-10 pt-xxl-10 ";
            timeClass = "primary-text-shadow";
            isBg = ""
            break;
        case 5:
            labelClass = "countdown-text-stroke custom-roboto";
            prantClass = "py-5 py-lg-50 py-xl-70";
            timeClass = "text-primary custom-jakarta";
            isBg = ""
            break;
        case 6:
            labelClass = "";
            prantClass = "pt-50 pt-lg-80 pt-xxl-100";
            timeClass = "primary-text-shadow";
            isBg = "";
            break;
        default:
            break;
    }
    // ----- Change classname define in home page

    return (
        <>
        <div className="col-lg-8 col-xl-7 wow text-center">
            <div className="section-title">
                <SectionName
                    name={""}
                    className={""}
                />
                <SectionTitleTwo
                    title={"¿Cuánto queda?"}
                    subTitle={""}
                    titleClass={""}
                    subTitleClass={"text-primary"}
                />

            </div>
        </div>
        <div className={`countdown-section position-relative ${prantClass}`}>
            <div className={isBg}>
                <div className="container">
                    {/* --CountDown Section 		 */}
                    <div className={`countdown ${countdownGradient}`}>
                        <div className="row row-cols-2 row-cols-lg-3 row-cols-xl-4 justify-content-between align-items-center">
                            <Col name={"Días"} time={currentTime.currentDays} labelClass={labelClass} timeClass={timeClass} id="days" />
                            <Col name={"Horas"} time={currentTime.currentHours} labelClass={labelClass} timeClass={timeClass} id="hours" />
                            <Col name={"Minutos"} time={currentTime.currentMinutes} labelClass={labelClass} timeClass={timeClass} id="minutes" />
                            <Col name={"Segundos"} time={currentTime.currentSeconds} labelClass={labelClass} timeClass={timeClass} id="seconds" />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default CountDown


const Col = ({ time, name, labelClass, timeClass, id }) => {
    return (
        <div className="col">
            <div className="countdown-item">
                <span className={`countdown-number  ${timeClass}`} id={id}>{time}</span>
                <span className={`countdown-label text-opacity ${labelClass}`}> <WordOpacity paragraph={name} /> </span>
            </div>
        </div>
    )
}