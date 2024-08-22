import React, { useCallback, useMemo } from "react";
import * as Popover from "@radix-ui/react-popover";

import { FontPickerList } from "./FontPickerList";
import { FontPickerTrigger } from "./FontPickerTrigger";
import { ButtonIconSelect } from "../ButtonIconSelect";
import {
  FontFamilyCodeIcon,
  FontFamilyNormalIcon,
  FreedrawIcon,
} from "../icons";
import { ButtonSeparator } from "../ButtonSeparator";
import type { FontFamilyValues } from "../../element/types";
import { FONT_FAMILY } from "../../constants";
import { t } from "../../i18n";

import "./FontPicker.scss";

export const DEFAULT_FONTS = [
  {
    value: FONT_FAMILY.Excalifont,
    icon: FreedrawIcon,
    text: t("labels.handDrawn"),
    testId: "font-family-handrawn",
  },
  {
    value: FONT_FAMILY.Nunito,
    icon: FontFamilyNormalIcon,
    text: t("labels.normal"),
    testId: "font-family-normal",
  },
  {
    value: FONT_FAMILY["Comic Shanns"],
    icon: FontFamilyCodeIcon,
    text: t("labels.code"),
    testId: "font-family-code",
  },
  {
    value: FONT_FAMILY.YunFengHanChanTi,
    icon: FreedrawIcon,
    text: "云峰寒蝉体",
    testId: "font-family-yunfeng",
  },
  {
    value: FONT_FAMILY.HongLeiXingShuJianTi,
    icon: FreedrawIcon,
    text: "鸿雷行书简体",
    testId: "font-family-honglei",
  },
  {
    value: FONT_FAMILY["Laura-Cursive"],
    icon: FreedrawIcon,
    text: "劳拉手写体",
    testId: "font-family-laura",
  },
  {
    value: FONT_FAMILY["Muyao-Softbrush"],
    icon: FreedrawIcon,
    text: "沐瑶软笔手写体",
    testId: "font-family-muyao",
  },
  {
    value: FONT_FAMILY["nishiki-teki"],
    icon: FreedrawIcon,
    text: "马克笔手写",
    testId: "font-family-nishiki",
  },
  {
    value: FONT_FAMILY["ZhiMangXing-Regular"],
    icon: FreedrawIcon,
    text: "钟齐志莽行书",
    testId: "font-family-zhimangxing",
  },
];

const defaultFontFamilies = new Set(DEFAULT_FONTS.map((x) => x.value));

export const isDefaultFont = (fontFamily: number | null) => {
  if (!fontFamily) {
    return false;
  }

  return defaultFontFamilies.has(fontFamily);
};

interface FontPickerProps {
  isOpened: boolean;
  selectedFontFamily: FontFamilyValues | null;
  hoveredFontFamily: FontFamilyValues | null;
  onSelect: (fontFamily: FontFamilyValues) => void;
  onHover: (fontFamily: FontFamilyValues) => void;
  onLeave: () => void;
  onPopupChange: (open: boolean) => void;
}

export const FontPicker = React.memo(
  ({
    isOpened,
    selectedFontFamily,
    hoveredFontFamily,
    onSelect,
    onHover,
    onLeave,
    onPopupChange,
  }: FontPickerProps) => {
    const defaultFonts = useMemo(() => DEFAULT_FONTS, []);
    const onSelectCallback = useCallback(
      (value: number | false) => {
        if (value) {
          onSelect(value);
        }
      },
      [onSelect],
    );

    return (
      <div role="dialog" aria-modal="true" className="FontPicker__container">
        <ButtonIconSelect<FontFamilyValues | false>
          type="button"
          options={defaultFonts}
          value={selectedFontFamily}
          onClick={onSelectCallback}
        />
        <ButtonSeparator />
        <Popover.Root open={isOpened} onOpenChange={onPopupChange}>
          <FontPickerTrigger selectedFontFamily={selectedFontFamily} />
          {isOpened && (
            <FontPickerList
              selectedFontFamily={selectedFontFamily}
              hoveredFontFamily={hoveredFontFamily}
              onSelect={onSelectCallback}
              onHover={onHover}
              onLeave={onLeave}
              onOpen={() => onPopupChange(true)}
              onClose={() => onPopupChange(false)}
            />
          )}
        </Popover.Root>
      </div>
    );
  },
  (prev, next) =>
    prev.isOpened === next.isOpened &&
    prev.selectedFontFamily === next.selectedFontFamily &&
    prev.hoveredFontFamily === next.hoveredFontFamily,
);
