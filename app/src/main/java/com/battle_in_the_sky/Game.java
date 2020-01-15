package com.battle_in_the_sky;

import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class Game extends AppCompatActivity {
    private WebView web;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.game_layout);

        web = (WebView)findViewById(R.id.webView);
        web.getSettings().setJavaScriptEnabled(true);

        web.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView web, String url) {
                web.loadUrl(url);
                return true;
            }
        });

        web.loadUrl("file:///android_asset/www/index.html");


    }

    @Override
    public void onResume(){

        web.reload();
        super.onResume();
    }



}
