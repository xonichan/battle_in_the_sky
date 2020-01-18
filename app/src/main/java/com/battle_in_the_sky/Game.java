package com.battle_in_the_sky;

import android.media.MediaPlayer;
import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import androidx.appcompat.app.AppCompatActivity;

import static com.battle_in_the_sky.R.raw.ost_battleinthesky_1;

public class Game extends AppCompatActivity {
    private WebView web;
    private MediaPlayer mediaPlayer;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.game_layout);

        web = findViewById(R.id.webView);
        web.getSettings().setJavaScriptEnabled(true);

        web.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView web, String url) {
                web.loadUrl(url);
                return true;
            }
        });
        web.loadUrl("file:///android_asset/www/index.html");

        mediaPlayer = MediaPlayer.create(this, ost_battleinthesky_1);
        mediaPlayer.isLooping();
        mediaPlayer.start();

    }

    @Override
    public void onResume() {
        web.reload();
        mediaPlayer.start();
        super.onResume();
    }

    @Override
    public void onRestart() {
        web.reload();
        mediaPlayer.start();
        super.onRestart();
    }


    @Override
    public void onPause() {
        super.onPause();
        mediaPlayer.stop();
    }

    @Override
    public void onStop() {
        super.onStop();
        mediaPlayer.stop();
    }

}
