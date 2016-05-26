|      |            |
|------|------------|
|Group | Out of Context |
|Assignment|Sprint 3|
|Date|17/05/16|
|TA|Bastiaan Reijm|

#Sprint Feedback
Feedback and Grades for Sprint 3.

Total: **9.2**

| User Story | Score |
|------------|-------|
| definition |  10    |
| splitting  |  10    |
| responsibility | 10 |

| Learning from History | Score |
|-----------------------|-------|
| estimation            | 8     |
| prioritisation        | 10    |
| reflection            | 8     |

## Notes
* Actual Total Effort (points) needs a baseline or you need to use hours. It's unclear how much work 30 (example) points.
* In the problem section adding a clear section about your solution.
* For situations such as problem 2, still provide your solution as being "We haven't really figured out how to fix this, so next week we are going to spend sometime to do this"
	* Not knowing is fine, a team discussion is a valid solution

#Code Evolution Quality Feedback

Total: **9.05**

| Architecture                       | Score |
|------------------------------------|-------|
| Changes                            |  8    |
| Architecture Design Document (ADD) |  6    |

|                     | Score |
|---------------------|-------|
| Code Change Quality | 8     |

| Code Readability | Score |
|------------------|-------|
| Formatting       | 10     |
| Naming           |  9    |
| Comments         | 10     |

| Continuous Integration | Score |
|------------------------|-------|
| Building               |  10    |
| Testing                |  9    |

|         | Score |
|---------|-------|
| Tooling | 10     |

| Pull-based Development | Score |
|------------------------|-------|
| Branching              |  10    |
| Code Review            |  10    |

##Notes
* ADD
	* You have a list of design goals, how do you intend to meet these goals?
		* I suggest subsections per goal, explaining what you've done so far to meet that particular goal		* 
	* Sequence diagrams / flow charts of how to the tools starts up and user interactions with the tool should be added 
	* Do you make use of AJAX calls? 
		* If so, that's concurrency. How do you handle them?
	* Good job on the coding + tooling choices documents, keep it up
* Good splitting of TS, CSS, and HTML
* Naming: JS folder contains TS code ...
* `RARequestsSender`
	* why is `api_location` not private as opposed to the rest of the attributes?
* `keystrokeTracker`
	* consider using a Map instead of a switch case
		* The map will still need to be manually filled but if it's stored as constant somewhere it makes this code less complex
* `Reader`
	* Seems like this example can be removed now 
* Excellent Code Reviews
* Excellent Tooling and Testing
* Note to increase the Testing grade you need to
	* provide documentation and convince me you've tested to the max
	* increase the coverage further if reasonable