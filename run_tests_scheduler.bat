@echo off
set /p BATCH_COUNT="Enter the number of test batches to run: "
set /p DELAY="Enter the delay (in seconds) between batches: "

:loop
for /L %%i in (1, 1, %BATCH_COUNT%) do (
    echo Running test batch %%i...
    npx playwright test all-tests
    echo Test batch %%i completed.
    if %%i NEQ %BATCH_COUNT% ping -n %DELAY% 127.0.0.1 > nul
)
echo All batches completed. Waiting before restarting...
ping -n %DELAY% 127.0.0.1 > nul
goto loop
