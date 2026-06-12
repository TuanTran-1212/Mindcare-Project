import React from "react";
import { useEffect, useRef } from "react";

interface StatCardProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  badgeText: string;
  badgeClass: string;
  linkText: string;
  linkHref?: string;
  iconClass: string;
  iconBgClass: string;
}

// Animate counter from start to target
function animateCounter(el: HTMLElement, target: number, duration = 1500) {
  const start = 0;
  const startTime = performance.now();

  const step = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // easeOutCubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = start + (target - start) * eased;

    // Format nicely
    el.textContent =
      target % 1 !== 0
        ? current.toFixed(2)
        : Math.floor(current).toLocaleString();

    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

const StatCard = ({
  title,
  value,
  prefix,
  suffix,
  badgeText,
  badgeClass,
  linkText,
  linkHref = "#",
  iconClass,
  iconBgClass,
}: StatCardProps) => {
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (counterRef.current) {
      animateCounter(counterRef.current, value);
    }
  }, [value]);

  return (
    <div className="card card-animate">
      <div className="card-body">
        <div className="d-flex align-items-center">
          <div className="flex-grow-1 overflow-hidden">
            <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
              {title}
            </p>
          </div>
          <div className="flex-shrink-0">
            <h5 className={`${badgeClass} fs-14 mb-0`}>{badgeText}</h5>
          </div>
        </div>
        <div className="d-flex align-items-end justify-content-between mt-4">
          <div>
            <h4 className="fs-22 fw-semibold ff-secondary mb-4">
              {prefix}
              <span ref={counterRef}>{value.toLocaleString()}</span>
              {suffix}
            </h4>
            <a href={linkHref}>{linkText}</a>
          </div>
          <div className="avatar-sm flex-shrink-0">
            <span className={`avatar-title ${iconBgClass} rounded fs-3`}>
              <i className={`${iconClass}`}></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
