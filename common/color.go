package common

import (
	"fmt"
	"runtime"
)

var FmtColor *Color

const (
	TextBlack = iota + 30
	TextRed
	TextGreen
	TextYellow
	TextBlue
	TextMagenta
	TextCyan
	TextWhite
)

type Color struct {
}

func init() {
	FmtColor = &Color{}
}
func (c *Color) Black(str string) string {
	return c.textColor(TextBlack, str)
}

func (c *Color) Red(str string) string {
	return c.textColor(TextRed, str)
}

func (c *Color) Green(str string) string {
	return c.textColor(TextGreen, str)
}

func (c *Color) Yellow(str string) string {
	return c.textColor(TextYellow, str)
}

func (c *Color) Blue(str string) string {
	return c.textColor(TextBlue, str)
}

func (c *Color) Magenta(str string) string {
	return c.textColor(TextMagenta, str)
}

func (c *Color) Cyan(str string) string {
	return c.textColor(TextCyan, str)
}

func (c *Color) White(str string) string {
	return c.textColor(TextWhite, str)
}

func (c *Color) textColor(color int, str string) string {
	if IsWindows() {
		return str
	}

	switch color {
	case TextBlack:
		return fmt.Sprintf("\x1b[0;%dm%s\x1b[0m", TextBlack, str)
	case TextRed:
		return fmt.Sprintf("\x1b[0;%dm%s\x1b[0m", TextRed, str)
	case TextGreen:
		return fmt.Sprintf("\x1b[0;%dm%s\x1b[0m", TextGreen, str)
	case TextYellow:
		return fmt.Sprintf("\x1b[0;%dm%s\x1b[0m", TextYellow, str)
	case TextBlue:
		return fmt.Sprintf("\x1b[0;%dm%s\x1b[0m", TextBlue, str)
	case TextMagenta:
		return fmt.Sprintf("\x1b[0;%dm%s\x1b[0m", TextMagenta, str)
	case TextCyan:
		return fmt.Sprintf("\x1b[0;%dm%s\x1b[0m", TextCyan, str)
	case TextWhite:
		return fmt.Sprintf("\x1b[0;%dm%s\x1b[0m", TextWhite, str)
	default:
		return str
	}
}

func IsWindows() bool {
	if runtime.GOOS == "windows" {
		return true
	} else {
		return false
	}
}
