|      |            |
|------|------------|
|Group | Out of Context |
|Assignment|Sprint 7|
|Date|12/06/16|
|TA|Bastiaan Reijm|

#Sprint Feedback
Feedback and Grades for Sprint 7.

Total: **9.55**

| User Story | Score |
|------------|-------|
| definition |  10   |
| splitting  |   7  |
| responsibility | 10 |

| Learning from History | Score |
|-----------------------|-------|
| estimation            |  10    |
| prioritisation        |  10   |
| reflection            |  10    |

## Notes
* Good Job!
* Thanks for adding the table with extra hours!
* Laurens has 33% to 45% less hours than the other team members??

#Code Evolution Quality Feedback

Total: **9.54**

| Architecture                       | Score |
|------------------------------------|-------|
| Changes                            |   8   |
| Architecture Design Document (ADD) |   9   |

|                     | Score |
|---------------------|-------|
| Code Change Quality |  9    |

| Code Readability | Score |
|------------------|-------|
| Formatting       |  10    |
| Naming           |  9    |
| Comments         |  10    |

| Continuous Integration | Score |
|------------------------|-------|
| Building               |   10   |
| Testing                |   10   |

|         | Score |
|---------|-------|
| Tooling |  10    |

| Pull-based Development | Score |
|------------------------|-------|
| Branching              |  10    |
| Code Review            |  10    |

##Notes
* Good job fixing the ADD and incorporating the feedback
* Declarations of interfaces should be explained somewhere (great idea btw!!)
* `LastMessageThrottle`
	* `maxDelay` the time units are not clear (I assume milliseconds) add a comment or change the name to incorporate this fact
* Throttles seem to be a candidate for a Decorator Pattern
	* especially `StartEndThrottle`
* `Tracker` (in RawTrackers)
	* naming is confusing since `SemanticTracker` does not inherit from it
	* rename to RawTracker?
* `DatabaseSchemes`
	* Well done renaming these to fall in line with the explanation you give in your coding choices document