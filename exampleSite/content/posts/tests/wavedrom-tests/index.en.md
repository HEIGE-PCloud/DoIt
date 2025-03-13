---
title: "WaveDrom Tests"
subtitle: ""
date: 2025-03-13T01:57:14+08:00
lastmod: 2025-03-13T01:57:14+08:00
draft: true
authors: [StephenZ]
description: "WaveDrom Tests"
categories: [Tests]
hiddenFromHomePage: true
hiddenFromSearch: true
---

<!--more-->

> All test cases are copied from https://observablehq.com/collection/@drom/wavedrom for testing rendering WaveDrom in DoIt.

## Timing Diagram

### Bus Timing (AHB)

```wavedrom
{signal: [
  {name: 'clock',   wave: 'p................'},
  {name: 'hwrite',  wave: 'x1x.1x..1.x.1.x..'},
  {name: 'htrans',  wave: 'x3x.4x..5.x.6.x..', data: '2 2 2 2'},
  {name: 'haddr',   wave: 'x3x.4x..5.x.6.x..', data: 'A0 A1 A2 A3'},
  {name: 'hwdata',  wave: 'x.3x.4.x..5x..6.x', data: 'D0 D1 D2 D3'},
  {},
  {name: 'hready',  wave: 'x1.x101x01.x0101x'},
],
    head: {tock: 1},
    gaps: '( . . | . s . | s . . | s . s . )',
    foot: {text: 'writes'}
}
```

### Handshake Annotations

#### Normal

```wavedrom
{
  signal: [
    {name: 'clk',   wave: 'p.PpPPPPp.P.'},
    {name: 'dat →', wave: 'x.3..4.5...6', data: 'D1 D2 D3'},
    {name: 'req →', wave: '0.1..1.1...1'},
    {name: 'ack ←', wave: '0...1010..10'},
    {},
    {name: 'FF',    wave: 'x....3.4...5', data: 'D1 D2 D3'},
  ],
  head: {
    tick: 1
  }
}
```

#### Compact

```wavedrom
{
  signal: [
    {name: 'clk',   wave: 'p.PpPPPPp.P.'},
    {name: 'dat →', wave: 'x.3..4.5...6', data: 'D1 D2 D3', over: '0.1..1.1...1', under: '0...1010..10'},
    {},
    {name: 'FF',    wave: 'x....3.4...5', data: 'D1 D2 D3'},
  ],
  head: {
    tick: 1
  }
}
```

### Piecewise Linear (PWL) Functions

```wavedrom
(() => {
  const sampler = arr => ['pw', {d: arr.flatMap((y, x) => [(x ? 'L' : 'M'), x / 32, y])}];
  const line = Array.from({length: 512}, (_, i) => i / 512); // line
  const sin = line.map((y, x) => Math.sin(3 * Math.PI * y) / 2 + 0.5); // Sin wave
  const saw = line.map((y, x) => (y * 16) % 1); // SAW line
  const pwm = sin.map((y, x) => (y > saw[x]) ? 1 : 0); // PWM
  return {signal: [
    {name: 'spacer',  wave: '0...............'},
    {name: 'line',    wave: sampler(line)},
    {name: 'sin',    wave: sampler(sin)},
    {name: 'saw',    wave: sampler(saw)},
    {name: 'pwm',    wave: sampler(pwm)},
  ]};
})()
```

## Bit-Field Diagrams

### Basic Example

```wavedrom
{
reg: [
    {name: 'IPO',   bits: 8},
    {               bits: 7},
    {name: 'BRK',   bits: 5, type: 4},
    {name: 'CPK',   bits: 1},
    {name: 'Clear', bits: 3, type: 5},
    {               bits: 8}
  ]
}
```

### Multi-Lanes

```wavedrom
{
  reg: [
    {bits: 7,  name: 'opcode', type: 8},
    {bits: 5,  name: 'rd', type: 2},
    {bits: 3,  name: 'func3', type: 8},
    {bits: 5,  name: 'rs1', type: 4},
    {bits: 5,  name: 'rs2', type: 4},
    {bits: 7,  name: 'funct7', type: 8},

    {bits: 7,  name: 'opcode', type: 8},
    {bits: 5,  name: 'rd', type: 2},
    {bits: 3,  name: 'func3', type: 8},
    {bits: 5,  name: 'rs1', type: 4},
    {bits: 12, name: 'imm[11:0]', type: 3},

    {bits: 7,  name: 'opcode', type: 8},
    {bits: 5,  name: 'imm[4:0]', type: 3},
    {bits: 3,  name: 'func3', type: 8},
    {bits: 5,  name: 'rs1', type: 4},
    {bits: 5,  name: 'rs2', type: 4},
    {bits: 7,  name: 'imm[11:5]', type: 3}
  ],
  config: {
    bits: 96,
    lanes: 3,
    compact: true,
    label: {right: ['R-Type', 'I-Type', 'S-Type']},
    hflip: true,
  }
}
```

## Logic Circuit Diagram

### Binary To Gray

```wavedrom
{
  assign:[
    ["g0", ["^", "b0", "b1"]],
    ["g1", ["^", "b1", "b2"]],
    ["g2", ["^", "b2", "b3"]],
    ["g3", ["=", "b3"]]
  ]
}
```

### 74LS688

```wavedrom
{
  assign:[
    [
      "z",
      [
        "~&",
        ["~^", ["~", "p0"], ["~", "q0"]],
        ["~^", ["~", "p1"], ["~", "q1"]],
        ["~^", ["~", "p2"], ["~", "q2"]],
        "...",
        ["~^", ["~", "p7"], ["~", "q7"]],
        ["~","~en"]
      ]
    ]
  ]
}
```

### IEC 60617 Symbols

```wavedrom
{
  assign:
  [
    ["out",
      ["XNOR",
        ["NAND",
          ["INV", "a"],
          ["NOR", "b", ["BUF","c"]]
        ],
        ["AND",
          ["XOR", "d", "e", ["OR", "f", "g"]],
          "h"
        ]
      ]
    ]
  ]
}
```
