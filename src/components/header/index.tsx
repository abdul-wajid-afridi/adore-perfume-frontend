import { memo, useEffect, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import TranslateText from "../text/translate-text";

const Header = memo(function Header() {
  const data = useMemo(
    () => [
      {
        id: 1,
        name: "AED",
        country: "UAE 🇦🇪",
        flag: "🇦🇪",
      },
      {
        id: 2,
        name: "SAR",
        country: "saudi 🇸🇦",
        flag: "🇸🇦",
      },
      {
        id: 3,
        name: "KWD",
        country: "kuwait 🇦🇪",
        flag: "🇦🇪",
      },
      {
        id: 4,
        name: "USD",
        country: "Dollar 🇺🇸",
        flag: "🇺🇸",
      },
      {
        id: 5,
        name: "GBP",
        country: "UK 🇬🇧",
        flag: "🇬🇧",
      },
    ],
    []
  );
  useEffect(() => {
    const setDefaultCurrency = () => {
      const storedCurrency = localStorage.getItem("currency");
      const storedCountry = localStorage.getItem("country");

      if (!storedCurrency) {
        localStorage.setItem("currency", data[0].name);
      } else {
        localStorage.setItem("currency", storedCurrency);
      }

      if (!storedCountry) {
        localStorage.setItem("country", data[0].country);
      } else {
        localStorage.setItem("country", storedCountry);
      }
    };

    if (data && data.length > 0) {
      setDefaultCurrency();
    }
  }, [data]);
  return (
    <div className="flex justify-between items-center bg-slate-50 h-[60px] px-5">
      <div>
        <Select
          // it accepts string so i enforced object into it thats why using any
          onValueChange={(value: any) => {
            localStorage.setItem("currency", value?.name);
            localStorage.setItem("country", value?.country);
            window.dispatchEvent(new Event("currencyChange"));
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue
              placeholder={
                localStorage.getItem("country") || "Select a currency"
              }
            />
          </SelectTrigger>
          <SelectContent>
            {data.map((it) => {
              return (
                <SelectGroup
                  onChange={() => localStorage.setItem("country", it.country)}
                  key={it.name}
                >
                  {/* // it accepts string so i enforced object into it thats why using any */}
                  <SelectItem
                    value={{ name: it.name, country: it.country } as any}
                  >
                    {it.country}
                  </SelectItem>
                </SelectGroup>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <div className="flex">
        <TranslateText />
      </div>
      <div></div>
    </div>
  );
});

export default Header;
