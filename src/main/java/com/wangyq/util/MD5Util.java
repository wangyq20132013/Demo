package com.wangyq.util;

import java.security.MessageDigest;

public class MD5Util {

	private static final String ALGORITHM = "MD5";
	private static MessageDigest md = null;

	public MD5Util() {
		
	}

	public static String cryptStr(String str) throws Exception {
		char pwd[] = new char[str.length()];
		for (int i = 0; i < str.length(); i++)
			pwd[i] = str.charAt(i);

		if (md == null)
			md = MessageDigest.getInstance("MD5");
		md.reset();
		byte pwdb[] = new byte[pwd.length];
		for (int b = 0; b < pwd.length; b++)
			pwdb[b] = (byte) pwd[b];

		char crypt[] = hexDump(md.digest(pwdb));
		smudge(pwdb);
		return new String(crypt);
	}

	private static char[] hexDump(byte src[]) {
		char buf[] = new char[src.length * 2];
		for (int b = 0; b < src.length; b++) {
			String byt = Integer.toHexString(src[b] & 255);
			if (byt.length() < 2) {
				buf[b * 2 + 0] = '0';
				buf[b * 2 + 1] = byt.charAt(0);
			} else {
				buf[b * 2 + 0] = byt.charAt(0);
				buf[b * 2 + 1] = byt.charAt(1);
			}
		}

		return buf;
	}

	private static void smudge(byte pwd[]) {
		if (pwd != null) {
			for (int b = 0; b < pwd.length; b++)
				pwd[b] = 0;
		}
	}

	public static void main(String args1[]) {
		
	}

}
