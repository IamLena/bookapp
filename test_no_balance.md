This is ApacheBench, Version 2.3 <$Revision: 1843412 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking localhost (be patient)


Server Software:        bookapp
Server Hostname:        localhost
Server Port:            80

Document Path:          /api/v1
Document Length:        185 bytes

Concurrency Level:      10
Time taken for tests:   0.632 seconds
Complete requests:      1000
Failed requests:        0
Non-2xx responses:      1000
Total transferred:      374000 bytes
HTML transferred:       185000 bytes
Requests per second:    1583.35 [#/sec] (mean)
Time per request:       6.316 [ms] (mean)
Time per request:       0.632 [ms] (mean, across all concurrent requests)
Transfer rate:          578.29 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.3      0       3
Processing:     1    6   2.6      6      17
Waiting:        1    6   2.5      5      17
Total:          1    6   2.6      6      17

Percentage of the requests served within a certain time (ms)
  50%      6
  66%      7
  75%      8
  80%      8
  90%     10
  95%     11
  98%     13
  99%     15
 100%     17 (longest request)
