# livestreaming-website

Just making a livestreaming website for fun. 

Will probably change the name later.


# nginx.conf

        worker_processes auto;

        events {
                worker_connections 4096;
        }

        http {
            sendfile off;
            tcp_nopush on;
            directio 512;
            default_type application/octet-stream;

            access_log off;
            error_log off;

            server {
                listen 80;
                server_name localhost;
                root /home/seven/web/;

                index index.html;
                default_type "text/html";

                location /hls {
                    types {
                        application/dash+xml mpd;
                        application/vnd.apple.mpegurl m3u8;
                        video/mp2t ts;
                    }

                    # CORS setup
                    add_header 'Access-Control-Allow-Origin' '*' always;
                    add_header 'Access-Control-Expose-Headers' 'Content-Length' always;

                    # allow CORS preflight requests
                    if ($request_method = 'OPTIONS') {
                        add_header 'Access-Control-Allow-Origin' '*';
                        add_header 'Access-Control-Max-Age' 1728000;
                        add_header 'Content-Type' 'text/plain charset=UTF-8';
                        add_header 'Content-Length' 0;
                        return 204;
                    }

                    # Disable cache
                    add_header 'Cache-Control' 'no-cache';
                }

                # This URL provides RTMP statistics in XML
                location /stat {
                    rtmp_stat all;

                    # Use this stylesheet to view XML as web page
                    # in browser
                    rtmp_stat_stylesheet /stat.xsl;
                }

                location /stat.xsl {
                    # XML stylesheet to view RTMP stats.
                    # Copy stat.xsl wherever you want
                    # and put the full directory path here
                    # root /path/to/stat.xsl/;
                    root /home/seven;
                }

                location /control {
                    rtmp_control all;
                }
            }
        }

        rtmp {
            server {
                listen 1935;
                # chunk_size 8192;
                # ack_window 8192;

                # Stream to "rtmp://IPHERE/app/live".
                application app {
                    live on;
                    wait_video on;
                    wait_key on;
                    exec_options on;
                    publish_notify on;
                    play_restart on;
                    drop_idle_publisher 6s;

                    # No RTMP playback
                    deny play all;

                    # Push this stream to the local HLS packaging application
                    push rtmp://127.0.0.1:1935/hls-live;

                    # HTTP callback when a stream starts publishing
                    # Should return 2xx to allow, 3xx to redirect, anything else to deny.
                    on_publish http://192.168.100.119:3001/v1/publish;

                    # Called when a stream stops publishing.  Response is ignored.
                    on_publish_done http://192.168.100.119:3001/v1/publish/done;
                }

                application hls-live {
                    live on;

                    # No RTMP playback
                    deny play all;

                    # Only allow publishing from localhost
                    allow publish 127.0.0.1;
                    deny publish all;

                    # Package this stream as HLS
                    hls on;
                    hls_path /home/seven/web/hls;

                    # Put streams in their own subdirectory under `hls_path`
                    # hls_nested on;
                    hls_fragment_naming system;

                    hls_fragment 2;
                }
            }
        }
