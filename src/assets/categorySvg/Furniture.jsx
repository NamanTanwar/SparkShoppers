import React from "react";

const FurnitureSvg = ({ height, width, fill }) => {
  return (
    <svg
      width={width}
      height={height}
      fill={fill}
      viewBox="-15.81 0 123.38 123.38"
      version="1.1"
      id="Layer_1"
      fillRule="evenodd"
      clipRule="evenodd"
      stroke="#000000"
      strokeWidth={0.5}
      strokeMiterlimit={2.6131}
    >
      <g>
        <path
          class="st0"
          d="M83.19,82.59v39.58c0,0.53-0.43,0.96-0.96,0.96h-7.44c-0.53,0-0.97-0.44-0.97-0.97V93.7H19v28.47 c0,0.53-0.43,0.96-0.96,0.96h-7.44c-0.53,0-0.97-0.44-0.97-0.97V82.59H6.4c-1.7,0-3.24-0.69-4.35-1.8c-1.11-1.11-1.8-2.65-1.8-4.35 v-6.18c0-1.7,0.69-3.24,1.8-4.35c1.11-1.11,2.65-1.8,4.35-1.8h7.53V40.66H6.71c-1.7,0-3.24-0.69-4.35-1.8 c-1.11-1.11-1.8-2.65-1.8-4.35V10.98c0-1.7,0.69-3.24,1.8-4.35c1.11-1.11,2.65-1.8,4.35-1.8h7.22V1.28c0-0.57,0.46-1.03,1.03-1.03 h6.81c0.57,0,1.03,0.46,1.03,1.03v3.55h45.82V1.28c0-0.57,0.46-1.03,1.03-1.03h6.81c0.57,0,1.03,0.46,1.03,1.03v3.55h7.84 c1.7,0,3.24,0.69,4.35,1.8c1.11,1.11,1.8,2.65,1.8,4.35v23.53c0,1.7-0.69,3.24-1.8,4.35c-1.11,1.11-2.65,1.8-4.35,1.8h-7.84v23.44 h7.53c1.7,0,3.24,0.69,4.35,1.8c1.11,1.11,1.8,2.65,1.8,4.35v6.18c0,1.7-0.69,3.24-1.8,4.35c-1.11,1.11-2.65,1.8-4.35,1.8H83.19 L83.19,82.59z M5.63,69.71h80.98v7.76H5.63V69.71L5.63,69.71z M5.95,10.71h79.69v23.28H5.95V10.71L5.95,10.71z M73.82,89.41v-6.82 H19v6.82H73.82L73.82,89.41z M68.63,64.11V40.66H22.81v23.44H68.63L68.63,64.11z"
        />
      </g>
    </svg>
  );
};

const Furniture = ({ height, width, fill, border }) => {
  return (
    <div className="flex flex-col space-y-2 items-center p-3">
      <div className={` border-${border} border-2 rounded-md p-3`}>
        <FurnitureSvg height={height} width={width} fill={fill} />
      </div>
      <p className="font-bold">Furniture</p>
    </div>
  );
};

export default Furniture;
