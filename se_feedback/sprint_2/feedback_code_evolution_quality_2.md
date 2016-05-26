|      |            |
|------|------------|
|Group | Out of Context |
|Assignment|Code Evolution Quality 2|
|Date|11/05/16|
|TA|Bastiaan Reijm|

#Feedback

Total: 7.6

| Architecture                       | Score |
|------------------------------------|-------|
| Changes                            | 8     |
| Architecture Design Document (ADD) | 8     |

|                     | Score |
|---------------------|-------|
| Code Change Quality | 7     |

| Code Readability | Score |
|------------------|-------|
| Formatting       | 8     |
| Naming           | 8     |
| Comments         | 8     |

| Continuous Integration | Score |
|------------------------|-------|
| Building               | 8     |
| Testing                | 7     |

|         | Score |
|---------|-------|
| Tooling | 8     |

| Pull-based Development | Score |
|------------------------|-------|
| Branching              | 8     |
| Code Review            | 8     |

##Notes
* Tag your releases on BitBucket so it's what's being graded
* `RARequests.ts`
	* Should it be responsible for sending requests if so, consider renaming
		* ex: RARequestSender
* `mouseTracker.ts` contains global level code
* `popup.ts` contains global level code and code duplication, keep an eye on this
* Do you have any test coverage reports? If so, please add them to your repo by:
	* adding them at the end of a Sprint to show the current status
	* adding them with each build if wercker supports this
* Good work on the changes to the ADD
	* Heads Up: The ADD needs more details on the security and privacy side (when you get to it)