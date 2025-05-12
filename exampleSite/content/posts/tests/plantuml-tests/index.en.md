---
title: "PlantUML Tests"
subtitle: ""
date: 2025-03-13T01:21:26+08:00
lastmod: 2025-03-13T01:21:26+08:00
draft: true
authors: [StephenZ]
description: "PlantUML Tests for Commonly Used Diagrams"
categories: [Tests]
hiddenFromHomePage: true
hiddenFromSearch: true
---

<!--more-->

> [!TIP]
> More examples of PlantUML could be found https://plantuml.com/en/. And all test cases, except the [Sequence Diagram](#sequence-diagram) and [Use Case Diagram](#use-case-diagram), are copied from it for testing rendering PlantUML in DoIt.

## UML Diagrams

###  Sequence Diagram

```plantuml
@startuml
' Set title and headers
title Complex Order Processing Flow
header Sample Process
footer Generated on %date%

' Define participant types with styling
actor Customer as C #FFD700
boundary "Web Interface" as UI #00FFFF
control "Order Controller" as OC #FFA07A
entity "Order Service" as OS #98FB98
database "Database" as DB #CD5C5C
collections "Payment Gateway" as PG #9370DB

' Autonumbering and color settings
autonumber "<b>[00]"
skinparam defaultTextAlignment center

== Initialization Phase ==

C -> UI: Submit Order Request
activate UI
UI -> OC: Process Request
activate OC

OC -> OS: Create New Order
activate OS
OS --> OC: Return Order ID
deactivate OS

OC -> DB: Save Order Data
activate DB
DB --> OC: Save Successful
deactivate DB

OC --> UI: Show Confirmation Page
deactivate OC
UI -> C: Display Order Confirmation
deactivate UI

== Payment Phase ==

alt Payment Successful
    C -> UI: Select Payment Method
    UI -> PG: Initiate Payment Request
    activate PG
    PG -> PG: Risk Check
    PG --> UI: Payment Success
    deactivate PG
    UI -> OS: Update Order Status
    activate OS
    OS -> DB: Mark as Paid
    DB --> OS: Update Successful
    OS --> UI: Confirm Update
    deactivate OS
else Payment Failed
    UI -> C: Show Error Message
end

loop Daily Reconciliation
    OS -> DB: Query Unreconciled Orders
    activate DB
    DB --> OS: Return Order List
    deactivate DB
    OS -> PG: Verify Payment Status
    PG --> OS: Return Status
end

par Parallel Processing
    OS -> OS: Generate E-Invoice
    activate OS
    note right: Async generation process
    OS -> DB: Store Invoice
    DB --> OS
    deactivate OS

    OS -> UI: Send Email Notification
    UI -> C: Email Notification
end

' Annotations and notes
note over C,UI: User Interaction Phase\nDuration: 5 mins
note left of PG
  <b>Third-party Service Notes:
  - Supports multiple payment methods
  - Requires HTTPS connection
end note

' Lifeline control
OC -> OC: Internal Validation
activate OC #FF0000
[-> OC: Async Callback
OC -->[
[-> UI: Push Notification
deactivate OC

' Grouping and styling
box "Internal Systems" #LightBlue
    participant OC
    participant OS
    participant DB
end box

@enduml
```

### Use Case Diagram

```plantuml
@startuml
' 标题与样式设置
title E-Commerce System Use Cases
header Core Features
footer v1.0 | %date%

skinparam {
  usecase {
    BackgroundColor #F0F8FF
    BorderColor DarkSlateGray
    FontName Arial
  }
  actor {
    BackgroundColor Lavender
    BorderColor DarkSlateBlue
  }
}

' 定义参与者
actor Customer as C #FFB6C1
actor "Admin" as A #87CEFA
actor PaymentGateway as PG <<External>> #FFA07A

package "User Management" {
  (Sign Up) as (SU) #LightGreen
  (Login) as (L)
  (Reset Password) as (RP)
  (RP) ..> (L) : extends
}

package "Order Processing" {
  (Place Order) as (PO) #FFFACD
  (Track Order) as (TO)
  (Cancel Order) as (CO)
}

C --> (PO) : initiates
C --> (TO) : checks
C --> (CO) : requests\n<color:red>Authorizing Required</color>

(PO) .> (Process Payment) : includes
(Process Payment) .> (Validate Payment Info) : includes
(Process Payment) ..> PG : uses

A --> (Generate Reports) : executes
(Generate Reports) <.. (Export PDF) : extends
(Generate Reports) <.. (Export Excel) : extends

(SU) <|-- (Social Media Signup)
(CO) <|-- (Partial Refund)
(TO) <.. (Notify Shipping Update) : <<extend>>\nif delayed

note top of PG : External payment service\nrequires HTTPS
note right of (Process Payment)
  <b>Preconditions:
  1. Valid items in cart
  2. Delivery address set
end note

package System {
  (Inventory Check) as (IC)
  (Update Catalog) as (UC)
}

A --> (UC) : manages
(IC) .> (PO) : <<include>>
@enduml
```

### Class Diagram

```plantuml
@startuml

abstract class AbstractList
abstract AbstractCollection
interface List
interface Collection

List <|-- AbstractList
Collection <|-- AbstractCollection

Collection <|- List
AbstractCollection <|- AbstractList
AbstractList <|-- ArrayList

class ArrayList {
  Object[] elementData
  size()
}

enum TimeUnit {
  DAYS
  HOURS
  MINUTES
}

annotation SuppressWarnings

annotation Annotation {
  annotation with members
  String foo()
  String bar()
}


@enduml
```

### Activity Diagram (New Syntax)

*Note: The old syntax of activity diagram is not recommended.*

```plantuml
@startuml

start

if (multiprocessor?) then (yes)
  fork
    :Treatment 1;
  fork again
    :Treatment 2;
  end fork
else (monoproc)
  :Treatment 1;
  :Treatment 2;
endif

@enduml
```

### Component Diagram

```plantuml
@startuml

package "Some Group" {
  HTTP - [First Component]
  [Another Component]
}

node "Other Groups" {
  FTP - [Second Component]
  [First Component] --> FTP
}

cloud {
  [Example 1]
}


database "MySql" {
  folder "This is my folder" {
    [Folder 3]
  }
  frame "Foo" {
    [Frame 4]
  }
}


[Another Component] --> [Example 1]
[Example 1] --> [Folder 3]
[Folder 3] --> [Frame 4]

@enduml
```

### State Diagram

```plantuml
@startuml
[*] -> State1
State1 --> State2 : Succeeded
State1 --> [*] : Aborted
State2 --> State3 : Succeeded
State2 --> [*] : Aborted
state State3 {
  state "Accumulate Enough Data" as long1
  long1 : Just a test
  [*] --> long1
  long1 --> long1 : New Data
  long1 --> ProcessData : Enough Data
  State2 --> [H]: Resume
}
State3 --> State2 : Pause
State2 --> State3[H*]: DeepResume
State3 --> State3 : Failed
State3 --> [*] : Succeeded / Save Result
State3 --> [*] : Aborted
@enduml
```

### Object Diagram

```plantuml
@startuml PERT
left to right direction
' Horizontal lines: -->, <--, <-->
' Vertical lines: ->, <-, <->
title PERT: Project Name

map Kick.Off {
}
map task.1 {
    Start => End
}
map task.2 {
    Start => End
}
map task.3 {
    Start => End
}
map task.4 {
    Start => End
}
map task.5 {
    Start => End
}
Kick.Off --> task.1 : Label 1
Kick.Off --> task.2 : Label 2
Kick.Off --> task.3 : Label 3
task.1 --> task.4
task.2 --> task.4
task.3 --> task.4
task.4 --> task.5 : Label 4
@enduml
```

### Deployment Diagram

```plantuml
@startuml
actor foo1
actor foo2
foo1 <-0-> foo2
foo1 <-(0)-> foo2

(ac1) -le(0)-> left1
ac1 -ri(0)-> right1
ac1 .up(0).> up1
ac1 ~up(0)~> up2
ac1 -do(0)-> down1
ac1 -do(0)-> down2

actor1 -0)- actor2

component comp1
component comp2
comp1 *-0)-+ comp2
[comp3] <-->> [comp4]

boundary b1
control c1
b1 -(0)- c1

component comp1
interface interf1
comp1 #~~( interf1

:mode1actor: -0)- fooa1
:mode1actorl: -ri0)- foo1l

[component1] 0)-(0-(0 [componentC]
() component3 )-0-(0 "foo" [componentC]

[aze1] #-->> [aze2]
@enduml
```

## Non-UML Diagrams

### Regex Diagram

```plantuml
@startregex
title repetitionEquivalance
a{0,1}b{1,} is the same as a?b+
@endregex
@enduml
```
### JSON Diagram

```plantuml
@startjson
{
  "firstName": "John",
  "lastName": "Smith",
  "isAlive": true,
  "age": 27,
  "address": {
    "streetAddress": "21 2nd Street",
    "city": "New York",
    "state": "NY",
    "postalCode": "10021-3100"
  },
  "phoneNumbers": [
    {
      "type": "home",
      "number": "212 555-1234"
    },
    {
      "type": "office",
      "number": "646 555-4567"
    }
  ],
  "children": [],
  "spouse": null
}
@endjson
```

### YAML Diagram

```plantuml
@startyaml
doe: "a deer, a female deer"
ray: "a drop of golden sun"
pi: 3.14159
xmas: true
french-hens: 3
calling-birds:
	- huey
	- dewey
	- louie
	- fred
xmas-fifth-day:
	calling-birds: four
	french-hens: 3
	golden-rings: 5
	partridges:
		count: 1
		location: "a pear tree"
	turtle-doves: two
@endyaml
```
