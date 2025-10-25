import Image from "next/image";

function Bar({ state }: { state: boolean }) {
  return (
    <div
      className={`w-[95%] h-4 rounded-full transition-all ${
        state
          ? "from-[#2FEA9B] to-[#7FDD53] bg-gradient-to-r"
          : "bg-[#FF383C]/50"
      }`}
    ></div>
  );
}

export default function Status() {
  return (
    <div className="lg:mt-[30px] w-full flex flex-col gap-y-[30px]">
      <div className="w-full p-2 bg-white rounded-[19px] shadow-md border">
        <h2 className="mx-4 my-1 font-bold">Current Status</h2>
        <div className="flex flex-row w-full font-semibold p-2">
          <Image
            src={"./icons/temp-three-quarters.svg"}
            alt="Temperature Icon"
            width={24}
            height={24}
            className="m-2"
          />
          <div className="w-full">
            <span>Temperature Sensor</span>
            <Bar state={true} />
          </div>
        </div>
        <div className="flex flex-row w-full font-semibold p-2">
          <Image
            src={"./icons/humidity.svg"}
            alt="Temperature Icon"
            width={24}
            height={24}
            className="m-2"
          />
          <div className="w-full">
            <span>Humidity Sensor</span>
            <Bar state={true} />
          </div>
        </div>
        <div className="flex flex-row w-full font-semibold p-2">
          <Image
            src={"./icons/temp-three-quarters.svg"}
            alt="Temperature Icon"
            width={24}
            height={24}
            className="m-2"
          />
          <div className="w-full">
            <span>Temperature Sensor</span>
            <Bar state={true} />
          </div>
        </div>
      </div>
      <div className="w-full p-2 bg-white rounded-[19px] shadow-md border">
        <h2 className="mx-4 my-1 font-bold">Current Status</h2>
        <div className="flex flex-row w-full font-semibold p-2">
          <Image
            src={"./icons/temp-three-quarters.svg"}
            alt="Temperature Icon"
            width={24}
            height={24}
            className="m-2"
          />
          <div className="w-full">
            <span>Temperature Sensor</span>
            <Bar state={false} />
          </div>
        </div>
        <div className="flex flex-row w-full font-semibold p-2">
          <Image
            src={"./icons/humidity.svg"}
            alt="Temperature Icon"
            width={24}
            height={24}
            className="m-2"
          />
          <div className="w-full">
            <span>Humidity Sensor</span>
            <Bar state={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
