import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { start } from "repl";

document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    })
    gsap.ticker.lagSmoothing(0);

    const features = document.querySelectorAll(".feature");
    const featureBgs = document.querySelectorAll(".featureBg");

    const featureStartPosition = [
        {top: 25, left: 15},
        {top: 12.5, left: 50},
        {top: 22.5, left: 75},
        {top: 30, left: 82.5},
        {top: 50, left: 20},
        {top: 80, left: 20},
        {top: 75, left: 75},
    ];

    features.forEach((feature, index) => {
        const featurePos = featureStartPosition[index];
        gsap.set(feature, {
            top: `${featurePos.top}%`,
            left: `${featurePos.left}%`,
        });
    });

    const featureStartDimensions = [];

    featureBgs.forEach((bg) => {
        const rect = bg.getBoundingClientRect();
        featureStartDimensions.push({
            width: rect.width,
            height: rect.height,
        });
    });

    const remInPixels = parseFloat(
        getComputedStyle(document.documentElement).fontSize
    );
    const targetWidth = 3 * remInPixels;
    const targetHeight = 3 * remInPixels;

    const getSearchBarFinalWidth = () => {
        return window.innerWidth < 1000 ? 20 : 25;
    }

    let searchBarFinalWidth = getSearchBarFinalWidth();

    window.addEventListener("resize", () => {
        searchBarFinalWidth = getSearchBarFinalWidth();
        ScrollTrigger.refresh();
    });

    ScrollTrigger.create({
        trigger: ".spotlight",
        start: "start",
        end: `+=${window.innerHeight * 3}px`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
            const progress = self.progress;

            if (progress <= 0.3333){
                const spotlightHeaderProgress = progress / 0.3333;
                gsap.set(".spotlightContent", {
                    y: `${-100 * spotlightHeaderProgress}%`
                });
            } else{
                gsap.set(".spotlightContent", {
                    y: "-100%",
                });
            }
        }
    });
});