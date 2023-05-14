<?php

class DateTimeHelper {

    public static function convertDateToString($date) {

        if ($date) {
            $dateEx = explode("-", $date);
            return $dateEx[2]."/".$dateEx[1]."/".$dateEx[0];
        }

    }

    public static function convertDateTimeToString($datetime) {

        if ($datetime) {
            $dateTimeEx = explode(" ", $datetime);
            $dateEx = explode("-", $dateTimeEx[0]);
            return $dateEx[2]."/".$dateEx[1]."/".$dateEx[0]." ".$dateTimeEx[1];
        }

    }

}

?>