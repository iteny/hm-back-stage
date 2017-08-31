package main

import (
	"fmt"
	"time"

	"github.com/shirou/gopsutil/mem"
)

type server struct {
	Addr         string
	ReadTimeout  time.Duration
	WriteTimeout time.Duration
}

func main() {
	memre, _ := mem.VirtualMemory()
	fmt.Printf("Total: %v, Free:%v, UsedPercent:%f%%\n", memre.Total, memre.Free, memre.UsedPercent)
}
