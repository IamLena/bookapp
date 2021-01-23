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
Time taken for tests:   0.743 seconds
Complete requests:      1000
Failed requests:        0
Non-2xx responses:      1000
Total transferred:      374000 bytes
HTML transferred:       185000 bytes
Requests per second:    1345.77 [#/sec] (mean)
Time per request:       7.431 [ms] (mean)
Time per request:       0.743 [ms] (mean, across all concurrent requests)
Transfer rate:          491.52 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.2      0       3
Processing:     1    7   3.8      7      39
Waiting:        1    7   3.7      6      35
Total:          1    7   3.8      7      39

Percentage of the requests served within a certain time (ms)
  50%      7
  66%      8
  75%      9
  80%      9
  90%     12
  95%     15
  98%     17
  99%     21
 100%     39 (longest request)
