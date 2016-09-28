package com.expenses.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.lang.reflect.Field;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by Armando on 10/04/2016.
 */
public class Util {

    private static final Logger log = LoggerFactory.getLogger(Util.class);

    public String getDirName(Date date){
        Calendar aux = Calendar.getInstance();
        aux.setTime(date);
        return getFormattedDate(aux.get(Calendar.YEAR)) + "_" + getFormattedDate(aux.get(Calendar.YEAR)) + "_" + getFormattedDate(aux.get(Calendar.YEAR));
    }

    public static String getFormattedDate(int date){
        if(date <= 9){
            return "0"+date;
        }else{
            return ""+date;
        }
    }

    public static String getFormattedMonth(int date){
        switch(date){
            case 0:{
                return "ENERO";
            }
            case 1:{
                return "FEBRERO";
            }
            case 2:{
                return "MARZO";
            }
            case 3:{
                return "ABRIL";
            }
            case 4:{
                return "MAYO";
            }
            case 5:{
                return "JUNIO";
            }
            case 6:{
                return "JULIO";
            }
            case 7:{
                return "AGOSTO";
            }
            case 8:{
                return "SEPTIEMBRE";
            }
            case 9:{
                return "OCTUBRE";
            }
            case 10:{
                return "NOVIEMBRE";
            }
            case 11:{
                return "DICIEMBRE";
            }
        }
        return "DEFAULT";
    }

    public static String getFormattedName(Calendar aux){
        return aux.get(Calendar.YEAR) + "_" + getFormattedDate(aux.get(Calendar.MONTH)) + "_" + getFormattedDate(aux.get(Calendar.DAY_OF_MONTH));
    }

    /**
     * Checks if a string is null or empty.
     * @param string String to validate.
     * @return True if null or empty, false otherwise.
     */
    public static boolean isNullEmpty(String string) {
        if (null == string) {
            return true;
        }
        if (string.trim().equals("")) {
            return true;
        }
        return false;
    }

    public static <T> List<T> filterByActive(List<T> list) {
        List<T> aux = new ArrayList<T>();
        if (null != list && list.size() > 0) {
            for (T bean : list) {
                Field field;
                try {
                    field = bean.getClass().getDeclaredField("active");
                    field.setAccessible(true);
                    if ((Boolean) field.get(bean)) {
                        aux.add(bean);
                    }
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                } catch (NoSuchFieldException e) {
                    e.printStackTrace();
                } catch (SecurityException e) {
                    e.printStackTrace();
                }
            }
        }
        return aux;
    }

    public static String  JSONStringify(Object object) {
        String json = null;
        ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
        try {
            json = ow.writeValueAsString(object);
        } catch (JsonProcessingException e) {
            log.error("Unable to convert object to json string.");
        }
        return json;
    }

    public static String skipSpecialChars(String name){
        return name.replaceAll("[^a-zA-Z0-9_.]", "");
    }

    public static Double getIntValueFromPayPalObject(Map<String, String> paymentInfo, String key){
        Double value = 0.0;

        try {
            value = Double.parseDouble(paymentInfo.get(key));
        } catch (NumberFormatException e){
            log.error("Paypal value ["+ key + "] is not defined for transaction: " + paymentInfo.get("txn_id"));
        }

        return value;
    }

    public static String formatHour(double hrs) {
        DateFormat dateFormat = new SimpleDateFormat("hh:mm a");
        Calendar cal = Util.getZeroTime();
        int hr = (int) hrs;
        int minutes = Util.getMinutes(hrs - hr);
        cal.set(Calendar.HOUR_OF_DAY, hr);
        cal.set(Calendar.MINUTE, minutes);

        return dateFormat.format(cal.getTime());
    }

    private static Calendar getZeroTime() {
        Calendar now = Calendar.getInstance();
        now.set(Calendar.HOUR, 0);
        now.set(Calendar.MINUTE, 0);
        now.set(Calendar.SECOND, 0);
        return now;
    }

    public static String formatDate(Date date) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        SimpleDateFormat dateFormat = new SimpleDateFormat("EEEE, d 'de' MMMM 'de' yyyy", new Locale("es", "ES"));
        return dateFormat.format(date);
    }

    public static String formatDate(Date date, String format) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        SimpleDateFormat dateFormat = new SimpleDateFormat(format, new Locale("es", "ES"));
        return dateFormat.format(date);
    }

    public static int getMinutes(Double hrs) {
        return (int) (hrs * 60);
    }

    public static Date getDateWithoutTime(Date date){
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        return calendar.getTime();
    }

    /**
     * Rounds a number  to n places.
     * @param value number to round.
     * @param places round places.
     * @return
     */
    public static double round(double value, int places) {
        if (places < 0) throw new IllegalArgumentException();

        long factor = (long) Math.pow(10, places);
        value = value * factor;
        long tmp = Math.round(value);
        return (double) tmp / factor;
    }

}
