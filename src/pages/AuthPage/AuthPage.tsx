import { EllipsesIcon } from "@shared/EllipsesIcon";
import { AuthForm } from "@features/AuthForm";

export default function AuthPage() {
  return (
    <div className="h-screen w-fulll bg-gray-100 flex items-center justify-center">
      <div className="bg-white w-[527px] h-[716px] rounded-[34px] border-white border-[6px] shadow-[0_24px_32px_rgba(0,0,0,0.04)]">
        <div className="w-full h-full rounded-[28px] border border-[#E0E0E0] shadow-[inset_0_4px_10px_rgba(0,0,0,0.08)] p-[48px]">
          <div className="flex items-center justify-center border-black  flex-col gap-[32px] text-[18px] ">
            <EllipsesIcon />
            <div className=" relative text-center font-['Inter']">
              <span className="font-semibold text-[40px] ">
                Добро пожаловать!
              </span>
              <div className="text-[#E0E0E0]">Пожалуйста, авторизируйтесь</div>
            </div>
            <div className="flex gap-[6px] flex-col">
              <AuthForm />
              <div className="border-b-2 border-[#EDEDED] mt-[22px]"></div>
              <div className="text-[16px] text-center relative top-[-20px] text-[#EBEBEB] ">
                <span className="bg-white pl-2 pr-2">ИЛИ</span>
              </div>
              <div className="text-center">
                <span>Нет аккаунта?</span>{" "}
                <a
                  href="#"
                  className="text-[#242EDB] font-semibold"
                  onClick={(e) => e.preventDefault()}
                >
                  <u> Создать</u>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
