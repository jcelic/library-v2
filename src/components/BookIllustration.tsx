const BookIllustration = () => {
  return (
    <svg
      viewBox="-30 -20 720 450"
      fill="none"
      fontFamily="inherit"
      className="mx-auto block w-full max-w-115 sm:max-w-130 lg:max-w-160"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <filter
          id="login-book-shadow"
          x="-50%"
          y="-30%"
          width="200%"
          height="200%"
          colorInterpolationFilters="sRGB"
        >
          <feDropShadow
            dx="0"
            dy="14"
            stdDeviation="12"
            floodColor="#000000"
            floodOpacity=".25"
          />
        </filter>

        <clipPath id="login-book-cover">
          <rect width="160" height="240" rx="8" />
        </clipPath>
      </defs>

      <g className="translate-x-10.5 lg:translate-x-0">
        {/* No Place to Hide */}
        <g
          className="hidden lg:block"
          transform="translate(463 112) rotate(16 80 120)"
          filter="url(#login-book-shadow)"
        >
          <g clipPath="url(#login-book-cover)">
            <rect width="160" height="240" fill="#FAF9F5" />
            <rect width="5" height="240" fill="#D6D3CA" />

            <text
              x="146"
              y="28"
              textAnchor="end"
              fill="#242424"
              fontSize="8"
              fontWeight="800"
              letterSpacing=".5"
            >
              GLENN GREENWALD
            </text>

            <text
              x="146"
              y="160"
              textAnchor="end"
              fill="#242424"
              fontSize="23"
              fontWeight="900"
              letterSpacing="-1"
            >
              <tspan x="146">No Place</tspan>
              <tspan x="146" dy="25">
                to Hide
              </tspan>
            </text>
          </g>
        </g>

        {/* 1984 */}
        <g className="-translate-y-12.5 lg:translate-y-0">
          <g
            transform="translate(35 110) rotate(-15 80 120)"
            filter="url(#login-book-shadow)"
          >
            <g clipPath="url(#login-book-cover)">
              <rect width="160" height="240" fill="#E43D27" />
              <rect width="5" height="240" fill="#BA3524" />

              <text
                x="17"
                y="28"
                fill="#FFFFFF"
                fontSize="8"
                fontWeight="900"
                letterSpacing=".7"
              >
                GEORGE ORWELL
              </text>

              <circle cx="105" cy="125" r="48" fill="#38A3D1" />

              <text
                x="17"
                y="218"
                fill="#FFFFFF"
                fontSize="36"
                fontWeight="900"
                letterSpacing="-1"
              >
                1984
              </text>
            </g>
          </g>
        </g>

        {/* The Stranger */}
        <g
          transform="translate(151 52) rotate(-7 80 120)"
          filter="url(#login-book-shadow)"
        >
          <g clipPath="url(#login-book-cover)">
            <rect width="160" height="240" fill="#27272A" />
            <rect width="5" height="240" fill="#3A3A3D" />

            <text
              x="17"
              y="28"
              fill="#EDE8D8"
              fontSize="8"
              fontWeight="900"
              letterSpacing=".6"
            >
              ALBERT CAMUS
            </text>

            <circle cx="130" cy="65" r="29" fill="#D7A72F" />

            <text
              x="17"
              y="193"
              fill="#EDE8D8"
              fontSize="25"
              fontWeight="900"
              letterSpacing="-1"
            >
              <tspan x="17">The</tspan>
              <tspan x="17" dy="25">
                Stranger
              </tspan>
            </text>
          </g>
        </g>

        {/* Crime and Punishment */}
        <g
          transform="translate(391 57) rotate(9 80 120)"
          filter="url(#login-book-shadow)"
        >
          <g clipPath="url(#login-book-cover)">
            <rect width="160" height="240" fill="#701C1C" />

            <text
              x="15"
              y="28"
              fill="#F1D5BD"
              fontSize="7.5"
              fontWeight="900"
              letterSpacing=".3"
            >
              FYODOR DOSTOEVSKY
            </text>

            <circle cx="24" cy="198" r="75" fill="#962E25" />

            <text
              x="16"
              y="190"
              fill="#F1D5BD"
              fontSize="22"
              fontWeight="900"
              letterSpacing="-1"
            >
              <tspan x="16">Crime and</tspan>
              <tspan x="16" dy="23">
                Punishment
              </tspan>
            </text>
          </g>
        </g>

        {/* Manufacturing Consent */}
        <g
          transform="translate(265 25) rotate(1 90 135)"
          filter="url(#login-book-shadow)"
        >
          <rect width="180" height="270" rx="8" fill="#EEE9D6" />
          <rect width="5" height="270" rx="2" fill="#C8C4B3" />

          <text
            x="20"
            y="31"
            fill="#242424"
            fontSize="8"
            fontWeight="800"
            letterSpacing="1"
          >
            CHOMSKY &amp; HERMAN
          </text>

          <path d="M20 165H160" stroke="#B62C22" strokeWidth="3" />

          <text
            x="20"
            y="225"
            fill="#242424"
            fontSize="21"
            fontWeight="900"
            letterSpacing="-1"
          >
            <tspan x="20">Manufacturing</tspan>
            <tspan x="20" dy="21">
              Consent
            </tspan>
          </text>
        </g>
      </g>
    </svg>
  );
};

export default BookIllustration;
