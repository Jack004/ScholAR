package it.pr.itis.scholar;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Point;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentPagerAdapter;
import android.support.v4.view.ViewPager;
import android.support.v7.app.AppCompatActivity;
import android.view.Display;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.widget.ImageView;

import java.io.File;

public class MainActivity extends AppCompatActivity {
    private final static String SCHOLAR_PREF = "scholar_preferences";
    private SectionsPagerAdapter mSectionsPagerAdapter;
    private ViewPager mViewPager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mSectionsPagerAdapter = new SectionsPagerAdapter(getSupportFragmentManager());

        mViewPager = (ViewPager) findViewById(R.id.container);
        mViewPager.setAdapter(mSectionsPagerAdapter);

        if(updatePreferences() == "1"){

        }
        else{
            startCam();
        }

        // BOTTONE CHE FA' PARTIRE LA CAMERA

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        if (fab != null) {
            fab.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    savePreferences();
                    startCam();
                }
            });
        }
    }

    public void startCam(){
        Intent ScholAR = new Intent(MainActivity.this, CamActivity.class);
        ScholAR.putExtra("activityArchitectWorldUrl", "VideoBackground" + File.separator + "index.html");
        startActivity(ScholAR);
        finish();
    }

    public void savePreferences(){
        SharedPreferences prefs = getSharedPreferences(SCHOLAR_PREF, Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = prefs.edit();
        editor.putString("firstAccess", "0");
        editor.commit();
    }

    public String updatePreferences(){
        SharedPreferences prefs = getSharedPreferences(SCHOLAR_PREF, Context.MODE_PRIVATE);
        return prefs.getString("firstAccess", "1");
    }

    /**
     * A placeholder fragment containing a simple view.
     */
    public static class PlaceholderFragment extends Fragment {
        /**
         * The fragment argument representing the section number for this
         * fragment.
         */
        private static final String ARG_SECTION_NUMBER = "section_number";

        public PlaceholderFragment() {
        }

        /**
         * Returns a new instance of this fragment for the given section
        * number.
        */
        public static PlaceholderFragment newInstance(int sectionNumber) {
            PlaceholderFragment fragment = new PlaceholderFragment();
            Bundle args = new Bundle();
            args.putInt(ARG_SECTION_NUMBER, sectionNumber);
            fragment.setArguments(args);
            return fragment;
        }

        @Override
        public View onCreateView(LayoutInflater inflater, ViewGroup container,  Bundle savedInstanceState) {
            View rootView = inflater.inflate(R.layout.fragment_main, container, false);

            WindowManager windowManager = (WindowManager) getContext().getSystemService(Context.WINDOW_SERVICE);
            Display display = windowManager.getDefaultDisplay();
            Point size = new Point();
            Bitmap bmp;

            int fragmentNumber = getArguments() != null ? getArguments().getInt(ARG_SECTION_NUMBER) : 1;

            display.getSize(size);
            switch (fragmentNumber){
                case 1:
                    bmp = Bitmap.createScaledBitmap(BitmapFactory.decodeResource(getResources(), R.drawable.tutorialp1), size.x, size.y, true);
                    break;
                case 2:
                    bmp = Bitmap.createScaledBitmap(BitmapFactory.decodeResource(getResources(), R.drawable.tutorialp2), size.x, size.y, true);
                    break;
                case 3:
                    bmp = Bitmap.createScaledBitmap(BitmapFactory.decodeResource(getResources(), R.drawable.tutorialp3), size.x, size.y, true);
                    break;
                default:
                    bmp = Bitmap.createScaledBitmap(BitmapFactory.decodeResource(getResources(), R.drawable.tutorialprova), size.x, size.y, true);
                    break;
            }


            ImageView bgTutorial = (ImageView) rootView.findViewById(R.id.tutorial);
            bgTutorial.setScaleType(ImageView.ScaleType.CENTER_CROP);
            bgTutorial.setImageBitmap(bmp);

            return rootView;
        }
    }

    /**
     * A {@link FragmentPagerAdapter} that returns a fragment corresponding to
     * one of the sections/tabs/pages.
     */
    public class SectionsPagerAdapter extends FragmentPagerAdapter {

        public SectionsPagerAdapter(FragmentManager fm) {
            super(fm);
        }

        @Override
        public Fragment getItem(int position) {
            // getItem is called to instantiate the fragment for the given page.
            // Return a PlaceholderFragment (defined as a static inner class below).
            return PlaceholderFragment.newInstance(position + 1);
        }

        @Override
        public int getCount() {
            // Show 3 total pages.
            return 3;
        }

        @Override
        public CharSequence getPageTitle(int position) {
            switch (position) {
                case 0:
                    return "SECTION 1";
                case 1:
                    return "SECTION 2";
                case 2:
                    return "SECTION 3";
            }
            return null;
        }
    }
}
