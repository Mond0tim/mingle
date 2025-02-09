// material-web-components-react.d.ts
/* eslint-disable */

import * as React from "react";

declare module "material-web-components-react/app-bar" {
  export interface AppBarProps extends React.HTMLAttributes<HTMLElement> {
    // Добавьте свойства, описанные в документации Material Web Components, если необходимо
  }
  const AppBar: React.FC<AppBarProps>;
  export default AppBar;
}

declare module "material-web-components-react/badge" {
  export interface BadgeProps extends React.HTMLAttributes<HTMLElement> {
    value?: string | number;
    max?: number;
    // Дополнительные свойства, если потребуются
  }
  const Badge: React.FC<BadgeProps>;
  export default Badge;
}

declare module "material-web-components-react/button" {
  export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    raised?: boolean;
    unelevated?: boolean;
    outlined?: boolean;
    dense?: boolean;
    icon?: string;
    // Другие свойства, описанные в документации https://github.com/material-components/material-web/blob/main/docs/components/button.md
  }
  const Button: React.FC<ButtonProps>;
  export default Button;
}

declare module "material-web-components-react/card" {
  export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    // Свойства карточки, если задокументированы
  }
  const Card: React.FC<CardProps>;
  export default Card;
}

declare module "material-web-components-react/checkbox" {
  export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    checked?: boolean;
    indeterminate?: boolean;
    // Другие свойства, если задокументированы
  }
  const Checkbox: React.FC<CheckboxProps>;
  export default Checkbox;
}

declare module "material-web-components-react/chip" {
  export interface ChipProps extends React.HTMLAttributes<HTMLElement> {
    selected?: boolean;
    // Дополнительные свойства
  }
  const Chip: React.FC<ChipProps>;
  export default Chip;

  export interface ChipSetProps extends React.HTMLAttributes<HTMLElement> {
    choice?: boolean;
    filter?: boolean;
    // Дополнительные свойства
  }
  export const ChipSet: React.FC<ChipSetProps>;
}

declare module "material-web-components-react/dialog" {
  export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
    open?: boolean;
    // Другие свойства, например, заголовок, контент и т.д.
  }
  const Dialog: React.FC<DialogProps>;
  export default Dialog;
}

declare module "material-web-components-react/divider" {
  export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
    vertical?: boolean;
  }
  const Divider: React.FC<DividerProps>;
  export default Divider;
}

declare module "material-web-components-react/elevation" {
  export interface ElevationProps extends React.HTMLAttributes<HTMLDivElement> {
    z?: number;
  }
  const Elevation: React.FC<ElevationProps>;
  export default Elevation;
}

declare module "material-web-components-react/fab" {
  export interface FABProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    mini?: boolean;
    // Дополнительные свойства
  }
  const FAB: React.FC<FABProps>;
  export default FAB;
}

declare module "material-web-components-react/focus-ring" {
  export interface FocusRingProps extends React.HTMLAttributes<HTMLDivElement> {
    // Свойства компонента FocusRing, если задокументированы
  }
  const FocusRing: React.FC<FocusRingProps>;
  export default FocusRing;
}

declare module "material-web-components-react/icon" {
  export interface IconProps extends React.HTMLAttributes<HTMLElement> {
    icon?: string;
    // Дополнительные свойства
  }
  const Icon: React.FC<IconProps>;
  export default Icon;
}

declare module "material-web-components-react/icon-button" {
  export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: string;
    // Другие свойства, если задокументированы
  }
  const IconButton: React.FC<IconButtonProps>;
  export default IconButton;
}

declare module "material-web-components-react/item" {
  export interface ItemProps extends React.HTMLAttributes<HTMLElement> {
    // Свойства элемента, если задокументированы
  }
  const Item: React.FC<ItemProps>;
  export default Item;
}

declare module "material-web-components-react/list" {
  export interface ListProps extends React.HTMLAttributes<HTMLElement> {
    // Дополнительные свойства для списка
  }
  const List: React.FC<ListProps>;
  export default List;

  export interface ListItemProps extends React.HTMLAttributes<HTMLElement> {
    // Дополнительные свойства для элемента списка
  }
  export const ListItem: React.FC<ListItemProps>;
}

declare module "material-web-components-react/menu" {
  export interface MenuProps extends React.HTMLAttributes<HTMLUListElement> {
    open?: boolean;
    // Другие свойства меню
  }
  const Menu: React.FC<MenuProps>;
  export default Menu;

  export interface MenuItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
    // Свойства элемента меню
  }
  export const MenuItem: React.FC<MenuItemProps>;
}

declare module "material-web-components-react/navigation-bar" {
  export interface NavigationBarProps extends React.HTMLAttributes<HTMLElement> {
    // Дополнительные свойства для навигационной панели
  }
  const NavigationBar: React.FC<NavigationBarProps>;
  export default NavigationBar;
}

declare module "material-web-components-react/navigation-drawer" {
  export interface NavigationDrawerModalProps extends React.HTMLAttributes<HTMLElement> {
    open?: boolean;
    // Другие свойства для модального навигационного ящика
  }
  export const NavigationDrawerModal: React.FC<NavigationDrawerModalProps>;
}

declare module "material-web-components-react/navigation-tab" {
  export interface NavigationTabProps extends React.HTMLAttributes<HTMLElement> {
    active?: boolean;
    // Дополнительные свойства вкладки
  }
  const NavigationTab: React.FC<NavigationTabProps>;
  export default NavigationTab;
}

declare module "material-web-components-react/navigation-rail" {
  export interface NavigationRailProps extends React.HTMLAttributes<HTMLElement> {
    // Дополнительные свойства для навигационной панели-рейла
  }
  const NavigationRail: React.FC<NavigationRailProps>;
  export default NavigationRail;
}

declare module "material-web-components-react/progress" {
  export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    progress?: number;
    buffer?: number;
    // Другие свойства, например, тип прогресса
  }
  const Progress: React.FC<ProgressProps>;
  export default Progress;
}

declare module "material-web-components-react/radio" {
  export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
    checked?: boolean;
    // Дополнительные свойства
  }
  const Radio: React.FC<RadioProps>;
  export default Radio;
}

declare module "material-web-components-react/ripple" {
  export interface RippleProps extends React.HTMLAttributes<HTMLElement> {
    // Свойства компонента Ripple
  }
  const Ripple: React.FC<RippleProps>;
  export default Ripple;
}

declare module "material-web-components-react/segmented-button" {
  export interface SegmentedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    selected?: boolean;
    // Дополнительные свойства для сегментированной кнопки
  }
  const SegmentedButton: React.FC<SegmentedButtonProps>;
  export default SegmentedButton;

  export interface SegmentedButtonSetProps extends React.HTMLAttributes<HTMLElement> {
    multi?: boolean;
    // Дополнительные свойства набора сегментированных кнопок
  }
  export const SegmentedButtonSet: React.FC<SegmentedButtonSetProps>;
}

declare module "material-web-components-react/select" {
  export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    // Дополнительные свойства селекта
  }
  const Select: React.FC<SelectProps>;
  export default Select;

  export interface SelectOptionProps extends React.OptionHTMLAttributes<HTMLOptionElement> {
    // Дополнительные свойства для опций
  }
  export const SelectOption: React.FC<SelectOptionProps>;
}

declare module "material-web-components-react/sheet" {
  export interface BottomSheetProps extends React.HTMLAttributes<HTMLElement> {
    open?: boolean;
    // Другие свойства листа
  }
  export const BottomSheet: React.FC<BottomSheetProps>;
}

declare module "material-web-components-react/slider" {
  export interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    // Дополнительные свойства
  }
  const Slider: React.FC<SliderProps>;
  export default Slider;
}

declare module "material-web-components-react/switch" {
  export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
    checked?: boolean;
    // Дополнительные свойства для переключателя
  }
  const Switch: React.FC<SwitchProps>;
  export default Switch;
}

declare module "material-web-components-react/tabs" {
  export interface TabsProps extends React.HTMLAttributes<HTMLElement> {
    activeIndex?: number;
    // Дополнительные свойства для вкладок
  }
  const Tabs: React.FC<TabsProps>;
  export default Tabs;

  export interface PrimaryTabProps extends React.HTMLAttributes<HTMLElement> {
    // Дополнительные свойства для основной вкладки
  }
  export const PrimaryTab: React.FC<PrimaryTabProps>;
}

declare module "material-web-components-react/text-field" {
  export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    outlined?: boolean;
    // Другие свойства, например, тип, placeholder и т.д.
  }
  const TextField: React.FC<TextFieldProps>;
  export default TextField;
}

declare module "material-web-components-react/snackbar" {
  export interface SnackbarProps extends React.HTMLAttributes<HTMLDivElement> {
    open?: boolean;
    message?: string;
    timeout?: number;
    // Дополнительные свойства для Snackbar
  }
  export function snackbar(options: SnackbarProps): void;
}

declare module "material-web-components-react/stack" {
  export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
    spacing?: number;
    // Дополнительные свойства для Stack
  }
  const Stack: React.FC<StackProps>;
  export default Stack;
}
