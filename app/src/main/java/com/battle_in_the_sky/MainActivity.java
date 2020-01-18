package com.battle_in_the_sky;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    Button btnStart;
    Button btnInfo;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        btnStart = findViewById(R.id.btnStart);
        btnStart.setOnClickListener(this);
        btnInfo = findViewById(R.id.btnInfo);
        btnInfo.setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.btnStart:
                Intent intent = new Intent(this, Game.class);
                startActivity(intent);
                break;

            case R.id.btnInfo:
                Intent intent2 = new Intent(this, Info.class);
                startActivity(intent2);
                break;


            default:
                break;
        }

    }
}
